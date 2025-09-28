import { IndexedEntity } from "./core-utils";
import type { Product, Category, Order } from "@shared/types";
import { PRODUCTS, CATEGORIES } from "@shared/mock-data";
// Using a single DO instance to hold all menu data (products and categories)
// This is efficient for read-heavy scenarios like a restaurant menu.
export type MenuState = {
  id: string;
  products: Product[];
  categories: Category[];
};
export class MenuEntity extends IndexedEntity<MenuState> {
  static readonly entityName = "menu";
  static readonly indexName = "menus"; // Although we'll likely only have one
  static readonly initialState: MenuState = { id: "", products: [], categories: [] };
  static readonly SINGLETON_ID = "v1"; // Use a fixed ID for the single menu instance
  // Seed data from mock-data.ts
  static seedData = [{
    id: MenuEntity.SINGLETON_ID,
    products: PRODUCTS,
    categories: CATEGORIES,
  }];
}
// ORDER ENTITY: one DO instance per order
export class OrderEntity extends IndexedEntity<Order> {
  static readonly entityName = "order";
  static readonly indexName = "orders";
  static readonly initialState: Order = {
    id: "",
    items: [],
    total: 0,
    createdAt: 0,
    customerName: "",
    customerEmail: "",
    shippingAddress: "",
  };
  // Override keyOf to create a composite key for indexing by email and then ID.
  // This allows us to query all orders for a given email.
  // Format: `email:order_id`
  // The generic must match the base class. We can then assert the type inside.
  static override keyOf<U extends { id: string; customerEmail: string }>(state: U): string {
    const order = state as Order;
    return `${order.customerEmail}:${order.id}`;
  }
}