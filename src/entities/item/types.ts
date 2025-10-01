export type Item = {
  id: number;
  name: string;
  slug: string;
  price_cents: number;
  description: string | null;
  image: string | null;
  is_active: boolean;
  category_id: number;
};
