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