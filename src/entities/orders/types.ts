export type OrderStatus =
  | "new"
  | "accepted"
  | "cooking"
  | "ready"
  | "picked_up"
  | "canceled";

export type GetOrdersTableType = {
  id: number;
  receipt_number?: string | null;
  created_at: string;
  status: OrderStatus;
  customer_name: string;
};

export type AddOrdersType = {
  id: number;
  status: OrderStatus;
  customer_name: string;
};

export type AddItemsType = {
  id: number;
  order_id: number;
  name: string;
  qty: number;
  status: OrderStatus;
  receipt_number?: string | null;
};
