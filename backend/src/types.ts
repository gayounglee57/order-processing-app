export type OrderStatus = 'Pending' | 'Processing' | 'Completed';

export type Order = {
  id: string;
  clientName: string;
  productId: number;
  productName: string;
  price: number;
  status: OrderStatus;
  createdAt: number;
};

export const PRODUCTS = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Phone', price: 699 },
  { id: 3, name: 'Headphones', price: 199 },
  { id: 4, name: 'Tablet', price: 499 },
];

export const PORT = 4000;
export const PROCESSING_DELAY_MS = 2000;
export const COMPLETED_DELAY_MS = 8000;