import { createClient } from "@supabase/supabase-js";
import type {
  OrderStatus,
  GetOrdersTableType,
  AddOrdersType,
  AddItemsType,
} from "../../entities/orders/types";

const url = import.meta.env.VITE_SUPABASE_URL;
const api = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(url, api);

export async function getOrdersTable(): Promise<GetOrdersTableType[]> {
  const { data, error } = await supabase.from("orders").select("*");
  if (error) throw error;
  return data;
}

export async function getOrderItemsTable() {
  const { data, error } = await supabase.from("order_items").select("*");
  if (error) throw error;
  return data ?? [];
}

export async function updateStatusOrder(id: number, status: OrderStatus) {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
}

export async function addNewOrderInfo(newOrder: AddOrdersType): Promise<void> {
  const { error } = await supabase.from("orders").insert([newOrder]).select();
  if (error) {
    console.error("order_items insert error:", error);
    throw error;
  }
}

export async function addNewItemsToOrder(
  newItems: AddItemsType[]
): Promise<void> {
  const { error } = await supabase
    .from("order_items")
    .insert(newItems)
    .select();
  if (error) {
    console.error("order_items insert error:", error);
    throw error;
  }
}
