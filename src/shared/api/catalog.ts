import type { CategoryType, ItemType } from "../../entities/category/types";
import { supabase } from "./supabaseClient";

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
export async function getItemsTable(): Promise<ItemType[]> {
  const { data, error } = await supabase.from("items").select("*");
  if (error) throw error;
  return data;
}

// ---- remove category OR item
export async function removefromTableCatOrItemy(nameTable: string, id: number) {
  const { data, error } = await supabase.from(nameTable).delete().eq("id", id);
  if (error) throw error;
  return data;
}
// ---- add new category
export async function addNewCategoryInTable(input: {
  name: string;
  slug: string;
  img?: string;
}) {
  const { error } = await supabase.from("categories").insert(input);
  if (error) throw error;
}

export async function addNewItemInTable(input: ItemType) {
  const { error } = await supabase.from("items").insert(input);
  if (error) throw error;
}

// ---- upload And Save Image
export async function uploadAndSaveImage(namePathFolder: string, file: File) {
  if (!file.type.startsWith("image/"))
    throw new Error("Please, load image file");
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const newName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error: upErr } = await supabase.storage
    .from(namePathFolder)
    .upload(newName, file, { upsert: false });
  if (upErr) throw upErr;
  const { data } = supabase.storage.from(namePathFolder).getPublicUrl(newName);
  return data.publicUrl;
}
