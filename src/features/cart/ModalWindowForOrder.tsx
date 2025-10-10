import { XCircleIcon } from "@heroicons/react/16/solid";
import fallback from "../../assets/empty.png";
import type { ItemType } from "../../pages/MenuCategoryPage";
import { useAppDispatch } from "../../app/hooks";
import { add } from "./cartSlice";
import { useState } from "react";
import { fromCentsToDollars } from "../../shared/lib/money";

type modalProps = {
  setClose: (value: boolean) => void;
  item: ItemType | null;
};

function ModalWindowForOrder({ setClose, item }: modalProps) {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();

  function handelAddItemToCart(item: ItemType) {
    const newItem = {
      name: item.name,
      id: item.id,
      image: item.image,
      price_cents: item.price_cents,
      quantity,
    };

    dispatch(add(newItem));
    setClose(false);
  }

  function increaseQuantity() {
    if (quantity >= 99) return;
    setQuantity((num) => ++num);
  }
  function decreaseQuantity() {
    if (quantity <= 1) return;
    setQuantity((num) => --num);
  }

  if (item === null) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65  w-full h-full ">
      <div className=" rounded-2xl max-w-[315px] overflow-auto bg-slate-50 m-auto mt-10 relative flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex">
            <img
              className="w-full object-cover"
              src={item.image ?? fallback}
              alt={item.name}
              loading="lazy"
            />
          </div>
          <div className="flex justify-between mt-5 px-5">
            <h4 className="text-center text-2xl ">{item.name}</h4>
            <span className="text-2xl">
              {fromCentsToDollars(item.price_cents)}
            </span>
          </div>
          <div className="mt-5 px-5">
            {item.description ? item.description : "-"}
          </div>
        </div>
        <div className="mx-auto gap-3 items-center mt-10 mb-5">
          <div className="flex items-center justify-center gap-3">
            <button
              className="bg-black text-white px-3 py-2"
              onClick={increaseQuantity}
            >
              +
            </button>
            <span>{quantity}</span>
            <button
              className="bg-black text-white px-3  py-2"
              onClick={decreaseQuantity}
            >
              -
            </button>
          </div>
          <div className="mt-10 ">
            <button
              className="bg-black text-white px-16 py-3"
              onClick={() => handelAddItemToCart(item)}
            >
              add to cart
            </button>
          </div>
        </div>

        <span
          className="cursor-pointer absolute top-2 right-2"
          onClick={() => setClose(false)}
        >
          <XCircleIcon width={48} />
        </span>
      </div>
    </div>
  );
}
export default ModalWindowForOrder;
