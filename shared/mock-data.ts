import type { Category, Product } from './types';
export const MOCK_USERS = [
  { id: 'u1', name: 'Alice' },
  { id: 'u2', name: 'Bob' },
];
export const MOCK_CHATS = [{ id: 'c1', title: 'General' }];
export const MOCK_CHAT_MESSAGES = [{ id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello!', ts: Date.now() }];
// AETHERIA EATERY MOCK DATA
export const CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Appetizers', slug: 'appetizers' },
  { id: 'cat2', name: 'Main Courses', slug: 'main-courses' },
  { id: 'cat3', name: 'Desserts', slug: 'desserts' },
  { id: 'cat4', name: 'Beverages', slug: 'beverages' },
  { id: 'cat5', name: 'Salads', slug: 'salads' },
];
export const PRODUCTS: Product[] = [
  {
    id: 'prod1',
    name: 'Golden Calamari',
    description: 'Crispy fried calamari served with a zesty citrus aioli.',
    price: 14.99,
    category: 'appetizers',
    imageUrl: 'https://images.unsplash.com/photo-1579631542720-3a83835976e3?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod2',
    name: 'Aetheria Burger',
    description: 'Wagyu beef patty, truffle cheese, and a secret sauce on a brioche bun.',
    price: 22.50,
    category: 'main-courses',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod3',
    name: 'Molten Lava Cake',
    description: 'Rich chocolate cake with a gooey molten center, served with vanilla bean ice cream.',
    price: 12.00,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1586985289936-76a035242444?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod4',
    name: 'Celestial Elixir',
    description: 'A refreshing blend of elderflower, cucumber, and sparkling water.',
    price: 8.50,
    category: 'beverages',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod5',
    name: 'Quinoa Galaxy Salad',
    description: 'Organic quinoa, mixed greens, avocado, and a lemon-tahini dressing.',
    price: 16.00,
    category: 'salads',
    imageUrl: 'https://images.unsplash.com/photo-1551248429-4097c682f72d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod6',
    name: 'Seared Scallops',
    description: 'Pan-seared scallops on a bed of saffron risotto.',
    price: 28.00,
    category: 'main-courses',
    imageUrl: 'https://images.unsplash.com/photo-1625862249590-43043b1799e6?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod7',
    name: 'Truffle Fries',
    description: 'Hand-cut fries tossed in truffle oil and parmesan cheese.',
    price: 9.00,
    category: 'appetizers',
    imageUrl: 'https://images.unsplash.com/photo-1598679253544-2c97992403ea?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod8',
    name: 'New York Cheesecake',
    description: 'Classic creamy cheesecake with a graham cracker crust and berry compote.',
    price: 11.50,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1565791204918-5386e733525b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod9',
    name: 'Filet Mignon',
    description: '8oz center-cut filet, grilled to perfection, with asparagus and potato gratin.',
    price: 45.00,
    category: 'main-courses',
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod10',
    name: 'Spicy Tuna Crispy Rice',
    description: 'Crispy rice topped with spicy tuna and jalapeño slices.',
    price: 18.00,
    category: 'appetizers',
    imageUrl: 'https://images.unsplash.com/photo-1625944239103-1dc53c11635e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod11',
    name: 'Lychee Martini',
    description: 'A delicate and aromatic cocktail with vodka, lychee liqueur, and fresh lychee.',
    price: 15.00,
    category: 'beverages',
    imageUrl: 'https://images.unsplash.com/photo-1623593688622-3603a1e68c11?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'prod12',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, parmesan, croutons, and a classic Caesar dressing.',
    price: 13.00,
    category: 'salads',
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop',
  },
];