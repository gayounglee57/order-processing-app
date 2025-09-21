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

export enum WS_EVENT {
  INITIAL_ORDERS = "initialOrders",
  ORDER_CREATED = "orderCreated",
  ORDER_UPDATED = "orderUpdated",
}