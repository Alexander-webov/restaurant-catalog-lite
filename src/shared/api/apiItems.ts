import supabase from "./supabase";

export async function getItemsTable() {
  const { data, error } = await supabase.from("items").select("*");
  if (error) console.log("Name table could not be loaded");
  return data;
}

export async function getCategory() {
  const { data } = await supabase
    .from("categories")
    .select("id")
    .ilike("slug", "burrito")
    .maybeSingle();
  return data;
}
export async function getCategoriesTable() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) console.log("Name table could not be loaded");
  return data;
}
