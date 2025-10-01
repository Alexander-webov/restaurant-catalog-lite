import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getItemsByCategorySlug } from "../../shared/api/catalog";
import fallback from "../../assets/empty.png";
import SkeletonView from "../../entities/skeleton/SkeletonView";
import { useState } from "react";
import { fromCentsToDollars } from "../../shared/lib/money";
import ModalWindowForOrder from "../../features/cart/ModalWindowForOrder";
import Title from "../../shared/ui/Title";
import {
  ArrowUturnLeftIcon,
  ShoppingCartIcon,
} from "@heroicons/react/16/solid";
import { useAppSelector } from "../../app/hooks";
import { selectCartQuantity } from "../../features/cart/cart.selectors";

export type ItemType = {
  id: number;
  name: string;
  slug: string;
  price_cents: number;
  description: string | null;
  image: string | null;
  is_active: boolean;
};

const Index = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ItemType | null>(null);
  const count = useAppSelector(selectCartQuantity);
  const { slug } = useParams<{ slug: string }>();
  const { data, isPending, isError } = useQuery({
    queryKey: ["itemsByCategory", slug],
    queryFn: () => getItemsByCategorySlug(slug!),
    enabled: !!slug,
  });

  function handelClick(item: ItemType) {
    setModalIsOpen(true);
    setCurrentItem(item);
  }

  if (!slug) return <h2>Category {slug} not found</h2>;
  if (isPending) return <SkeletonView />;
  if (isError) return <h2>Category not found</h2>;
  const items = data ?? [];

  return (
    <div className="relative flex flex-col justify-between ">
      <div className="mb-5 flex justify-between items-center">
        <Title>/ {slug}</Title>

        <div className="flex">
          <Link className="bg-black text-white px-5 py-3 ml-5 " to="/menu">
            <ArrowUturnLeftIcon width={30} />
          </Link>
          <Link
            className="bg-black text-white px-5 py-3 ml-5 flex items-center"
            to="/cart"
          >
            <ShoppingCartIcon width={30} />
            <span className="ml-1">{count}</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 w-[1140px] flex-1 max-h-[700px] h-full overflow-x-auto">
        {items.map((el) => (
          <div
            className="cursor-pointer z-1"
            key={el.id}
            onClick={() => handelClick(el)}
          >
            <img
              className="w-[240px] h-[240px] object-cover "
              src={el.image === null ? fallback : el.image}
              alt={el.name}
            />
            <div className="flex justify-between mb-5">
              <h3>{el.name}</h3>
              <span>{fromCentsToDollars(el.price_cents)}</span>
            </div>
          </div>
        ))}
      </div>

      {modalIsOpen ? (
        <ModalWindowForOrder setClose={setModalIsOpen} item={currentItem} />
      ) : null}
    </div>
  );
};

export default Index;
