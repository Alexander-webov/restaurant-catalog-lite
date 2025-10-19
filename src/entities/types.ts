export type CategoryType = {
  id: number;
  name: string;
  slug: string;
  sort: number;
  img: string;
};

export type ItemType = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  price_cents: number;
};

export type NewItemInput = {
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  price_cents: number;
};
