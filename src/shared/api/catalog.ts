import type { CategoryType } from "../../entities/category/types";
import { createClient } from "@supabase/supabase-js";
import type { Item } from "../../entities/item/types";

export const supabaseUrl = "https://hpdmazoinooplupevrsz.supabase.co";
export const supabaseAPI =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwZG1hem9pbm9vcGx1cGV2cnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NTY4ODgsImV4cCI6MjA3NDIzMjg4OH0._ptkhckFPTQyZkkUq5Vxg3tFTjL9_2v_s15ioYpLk90";
const url = import.meta.env.VITE_SUPABASE_URL;
const api = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(url, api);
export default supabase;

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
