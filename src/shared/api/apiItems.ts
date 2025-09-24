import supabase from "./supabase";

export async function getItemsTable() {
  const { data, error } = await supabase.from("category").select("*");
  if (error) console.log("Name table could not be loaded");
  return data;
}
