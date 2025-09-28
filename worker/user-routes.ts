import { Hono } from "hono";
import type { Env } from './core-utils';
import { MenuEntity, OrderEntity } from "./entities";
import { ok, bad, notFound, isStr, Index } from './core-utils';
import type { OrderItem, Order } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Ensure menu data is seeded on first request
  app.use('/api/*', async (c, next) => {
    await MenuEntity.ensureSeed(c.env);
    await next();
  });
  // GET /api/menu - Fetches all products
  app.get('/api/menu', async (c) => {
    const menu = new MenuEntity(c.env, MenuEntity.SINGLETON_ID);
    if (!await menu.exists()) {
      return notFound(c, 'menu data not found');
    }
    const state = await menu.getState();
    return ok(c, state.products);
  });
  // GET /api/categories - Fetches all categories
  app.get('/api/categories', async (c) => {
    const menu = new MenuEntity(c.env, MenuEntity.SINGLETON_ID);
    if (!await menu.exists()) {
      return notFound(c, 'menu data not found');
    }
    const state = await menu.getState();
    return ok(c, state.categories);
  });
  // POST /api/orders - Submits a new order
  app.post('/api/orders', async (c) => {
    const { items, total, customerName, customerEmail, shippingAddress } = (await c.req.json()) as {
      items?: OrderItem[],
      total?: number,
      customerName?: string,
      customerEmail?: string,
      shippingAddress?: string,
    };
    if (!items || !Array.isArray(items) || items.length === 0) {
      return bad(c, 'Order must contain at least one item.');
    }
    if (typeof total !== 'number' || total <= 0) {
      return bad(c, 'Invalid total amount.');
    }
    if (!isStr(customerName) || !isStr(customerEmail) || !isStr(shippingAddress)) {
      return bad(c, 'Customer details are incomplete.');
    }
    const orderId = crypto.randomUUID();
    const newOrder: Order = {
      id: orderId,
      items,
      total,
      customerName,
      customerEmail,
      shippingAddress,
      createdAt: Date.now(),
    };
    // The composite key is created by `keyOf` in OrderEntity
    const createdOrder = await OrderEntity.create(c.env, newOrder);
    return ok(c, { orderId: createdOrder.id, message: "Order placed successfully!" });
  });
  // GET /api/orders/history/:email - Fetches all orders for a given email
  app.get('/api/orders/history/:email', async (c) => {
    const email = c.req.param('email');
    if (!isStr(email)) {
      return bad(c, 'A valid email is required.');
    }
    // Use the main 'orders' index to find all orders for this user
    const orderIndex = new Index<string>(c.env, OrderEntity.indexName);
    // The keys are stored as `email:order_id`. We can list them by prefix.
    // The `page` method in our Index class uses `listPrefix` under the hood.
    // However, `listPrefix` is on the DO stub, not the Index class directly.
    // Let's get all keys and filter. For a real app with pagination, we'd enhance the Index class.
    const allOrderKeys = await orderIndex.list();
    const userOrderKeys = allOrderKeys.filter(key => key.startsWith(`${email}:`));
    if (userOrderKeys.length === 0) {
      return ok(c, []);
    }
    // Extract the order IDs from the composite keys
    const orderIds = userOrderKeys.map(key => key.split(':')[1]);
    // Fetch all order documents in parallel
    const orders = await Promise.all(
      orderIds.map(id => new OrderEntity(c.env, id).getState())
    );
    return ok(c, orders);
  });
}