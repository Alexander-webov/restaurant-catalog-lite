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
/* import { isStoreOpen } from "../../shared/lib/timeCloseStore";
import toast from "react-hot-toast"; */

export type ItemType = {
  id: number;
  name: string;
  slug: string;
  price_cents: number;
  description: string | null;
  image: string | null;
  is_active: boolean;
};
/* const CLOSED_TOAST_ID = "store-closed"; */
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
    //business hours
    /*     const isOpnen = isStoreOpen(9, 0, 12, 0);
    if (!isOpnen) {
      toast.error(
        `Sorry, we’re closed now. We’re open from 9:00 AM to 10:00 PM`,
        {
          id: CLOSED_TOAST_ID,
        }
      );
      return;
    } */
    setModalIsOpen(true);
    setCurrentItem(item);
  }

  if (!slug) return <h2>Category {slug} not found</h2>;
  if (isPending) return <SkeletonView />;
  if (isError) return <h2>Category not found</h2>;
  const items = data ?? [];

  return (
    <div className="relative flex flex-col justify-between ">
      <div className="mb-5 flex justify-around xl:justify-between items-center">
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

      <div className="flex justify-around xl:justify-normal flex-wrap gap-5 max-w-[1140px] flex-1 max-h-[700px] h-full overflow-x-auto px-5">
        {items.map((el) => (
          <div
            className="cursor-pointer z-1 w-[224px] mx-3 mb-1"
            key={el.id}
            onClick={() => handelClick(el)}
          >
            <div className="w-[224px] h-[250px]">
              <img
                className="h-full w-full object-cover rounded-lg"
                src={el.image === null ? fallback : el.image}
                alt={el.name}
              />
            </div>
            <div className="flex justify-between mt-2">
              <h3 className="font-bold text-xl max-w-[171px]">{el.name}</h3>
              <span className="text-xl">
                {fromCentsToDollars(el.price_cents)}
              </span>
            </div>
            <div className="">{el.description}</div>
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
