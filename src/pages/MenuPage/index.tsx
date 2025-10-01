import Title from "../../shared/ui/Title";
import { getCategoriesTable } from "../../shared/api/catalog";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ErrorState from "../../shared/ui/ErrorState";
import Category from "../../entities/category/Category";
import SkeletonView from "../../entities/skeleton/SkeletonView";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useAppSelector } from "../../app/hooks";
import { selectCartQuantity } from "../../features/cart/cart.selectors";

const MenuPage = () => {
  const [showMore, setShowMore] = useState(true);
  const count = useAppSelector(selectCartQuantity);
  const {
    isPending,
    data: categories,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await getCategoriesTable();
      return data;
    },
  });

  if (isPending) return <SkeletonView />;
  if (isError) return <ErrorState title="Failed to load categories" />;

  return (
    <div>
      <div className="">
        <div className="mb-5 flex justify-between items-center">
          <Title>MENU</Title>

          <div className="flex">
            <Link
              className="bg-black text-white px-5 py-3 ml-5 flex items-center"
              to="/cart"
            >
              <ShoppingCartIcon width={30} />
              <span className="ml-1">{count}</span>
            </Link>
          </div>
        </div>

        <div
          className={`flex flex-wrap gap-2 text-center max-h-[600px] ${
            !showMore ? "overflow-y-auto" : "overflow-y-hidden"
          } mt-5`}
        >
          {categories?.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </div>
      {categories.length < 8
        ? null
        : showMore && (
            <button
              onClick={() => setShowMore(!showMore)}
              className=" mt-5 py-4 px-8 bg-black text-white  block mx-auto"
            >
              show more
            </button>
          )}
    </div>
  );
};

export default MenuPage;
