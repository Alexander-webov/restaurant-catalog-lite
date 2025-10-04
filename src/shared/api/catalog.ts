import type { CategoryType } from "../../entities/category/types";
import { createClient } from "@supabase/supabase-js";
import type { Item } from "../../entities/item/types";

const url = import.meta.env.VITE_SUPABASE_URL;
const api = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(url, api);

// ---- categories

export async function getCategoriesTable(): Promise<CategoryType[]> {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;
  return data ?? [];
}

export async function getCategory() {
  const { data } = await supabase
    .from("categories")
    .select("id")
    .ilike("slug", "burrito")
    .maybeSingle();
  return data;
}

export async function getItemsByCategorySlug(slug: string) {
  const { data, error } = await supabase
    .from("items")
    .select("id,name,slug,price_cents,description,image,is_active")
    .eq("slug", slug);

  if (error) throw error;
  return data;
}

// ---- items
export async function getItemsTable(): Promise<Item[]> {
  const { data, error } = await supabase.from("items").select("*");
  if (error) throw error;
  return data;
}
