import { XCircleIcon } from "@heroicons/react/16/solid";
import fallback from "../../assets/empty.png";
import type { ItemType } from "../../pages/MenuCategoryPage";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { add, type CartItem } from "./cartSlice";
import { useState } from "react";

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
    console.log(newItem);
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
      <div className="w-[min(850px,92vw)] h-[min(600px,92vh)] overflow-auto bg-slate-50 m-auto mt-10 relative p-5 flex flex-col justify-between">
        <h4 className="text-center text-2xl ">{item.name}</h4>
        <div className="flex flex-1">
          <div className="flex  ">
            <img
              className="max-w-[250px] max-h-[250px] object-cover"
              src={item.image ?? fallback}
              alt={item.name}
              loading="lazy"
            />
          </div>
          <div className="ml-5">
            Description:{item.description ? item.description : "-"}
          </div>
        </div>
        <div className="mx-auto flex gap-3 items-center">
          <button
            className="bg-black text-white px-3 py-2"
            aria-label
            onClick={increaseQuantity}
          >
            +
          </button>
          <span>{quantity}</span>
          <button
            className="bg-black text-white px-3  py-2"
            aria-label
            onClick={decreaseQuantity}
          >
            -
          </button>
          <button
            className="bg-black text-white px-10 py-3 ml-5"
            onClick={() => handelAddItemToCart(item)}
          >
            add to cart
          </button>
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
