import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hpdmazoinooplupevrsz.supabase.co";
export const supabaseAPI =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwZG1hem9pbm9vcGx1cGV2cnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NTY4ODgsImV4cCI6MjA3NDIzMjg4OH0._ptkhckFPTQyZkkUq5Vxg3tFTjL9_2v_s15ioYpLk90";
const url = import.meta.env.VITE_SUPABASE_URL;
const api = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(url, api);
export default supabase;
