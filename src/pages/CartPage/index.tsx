import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Title from "../../shared/ui/Title";
import fallback from "../../assets/empty.png";
import {
  decrementItem,
  delteItem,
  incrementItem,
} from "../../features/cart/cartSlice";
import { fromCentsToDollars } from "../../shared/lib/money";
import { XMarkIcon } from "@heroicons/react/16/solid";
import GoToMenu from "../../shared/ui/GoToMenu";
import {
  selectCountProcentDiscount,
  selectSubtotalCents,
  selectTaxCents,
  selectTotalCents,
} from "../../features/cart/cart.selectors";
import { useEffect, useState } from "react";
import { applyCode } from "../../features/promo/promoSlice";
import { CONVENIENCE_FEE_CENTS } from "../../features/cart/cart.constans";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
const Cart = () => {
  const [promoInputValue, setPromoInputValue] = useState("");
  const { cart } = useAppSelector((state) => state.cart);
  const { promo } = useAppSelector((state) => state);
  console.log(promo);
  const dispatch = useAppDispatch();
  const discount = useAppSelector(selectCountProcentDiscount);
  const totalPriceItems = useAppSelector(selectSubtotalCents);
  const tax = useAppSelector(selectTaxCents);
  const convenienceFee = CONVENIENCE_FEE_CENTS;
  const totalPrice = useAppSelector(selectTotalCents);

  function handelPromo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const code = promoInputValue.trim();

    if (!code) {
      toast.error("Please, enter your promo code.");
      return;
    }
    if (code !== promo.codeWord) {
      toast.error(`Your code "${code}" is not correct.`);
      return;
    }

    dispatch(applyCode({ discount: 0.25, code }));
  }

  useEffect(() => {
    if (promo.applied)
      toast.success(`WOW! You got discount -${fromCentsToDollars(discount)}`);
    setPromoInputValue("");
  }, [promo.applied, discount]);
  return (
    <div className="h-full w-[1140px]">
      <Title>CART</Title>
      {cart.length > 0 ? (
        <div className="flex gap-5">
          <div className="max-h-[600px] overflow-x-auto">
            {cart.map((item) => (
              <div
                key={item.id}
                className="w-[610px] bg-[#F1D5BB]  px-5 py-6  flex justify-between items-center text-xl"
              >
                <div className="flex items-center w-[310px]">
                  <img
                    className="rounded-full w-24 h-24 object-cover"
                    src={item.image ?? fallback}
                    alt={item.name}
                  />
                  <div className="ml-5">
                    <div className="font-bold">{item.name}</div>
                    <div className="">
                      {fromCentsToDollars(item.price_cents)}
                    </div>
                  </div>
                </div>
                <div className="">
                  <button
                    className="bg-black text-white px-3 py-1"
                    onClick={() => dispatch(incrementItem({ id: item.id }))}
                  >
                    +
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    className="bg-black text-white px-3  py-1"
                    onClick={() => dispatch(decrementItem({ id: item.id }))}
                  >
                    -
                  </button>
                </div>
                <div>
                  <button onClick={() => dispatch(delteItem({ id: item.id }))}>
                    <XMarkIcon width={30} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="ml-5">
            <div className="bg-[#F1D5BB] w-[330px]   mb-4 px-5 py-7">
              <p className="text-3xl mt-2 text-center">Order Summary</p>
              <div className="text-2xl mt-5">
                Subtotal <span>{fromCentsToDollars(totalPriceItems)}</span>
              </div>
              <div className="text-xl mt-2">
                Tax <span>{fromCentsToDollars(tax)}</span>
              </div>
              <div className="text-xl mt-2">
                Convenience Fee{" "}
                <span>{fromCentsToDollars(convenienceFee)}</span>
              </div>
              <div className="text-xl mt-2">
                Total <span>{fromCentsToDollars(totalPrice)}</span>
              </div>
              <button className="mt-8 bg-black text-white px-3  py-5 w-full">
                Confirm Order
              </button>
            </div>
            <div className="border-2 border-[#F1D5BB] p-5 w-[330px] mt-10">
              <p className="text-3xl mt-5">Promo Code</p>
              {promo.applied ? (
                <div className="text-xl mt-2">
                  Discount <span> -{fromCentsToDollars(discount)}</span>{" "}
                  <span className="text-green-500">APPLIED</span>
                </div>
              ) : (
                <form onSubmit={handelPromo}>
                  <input
                    type="text"
                    placeholder="enter promo code"
                    value={promoInputValue}
                    className="mt-8 px-3 py-4 w-full border-black border-2"
                    onChange={(e) => setPromoInputValue(e.target.value)}
                  />
                  <button className="mt-8 bg-black text-white px-3  py-5 w-full">
                    Apply
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className=" text-center mt-20 font-bold text-3xl w-full ">
          <span className="uppercase">cart is empty</span>
          <div className="mt-10">
            <GoToMenu />
          </div>
        </div>
      )}
      <Toaster position="bottom-right" reverseOrder={true} />
    </div>
  );
};

export default Cart;
