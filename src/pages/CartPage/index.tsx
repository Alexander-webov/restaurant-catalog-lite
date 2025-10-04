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
const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);

  const totalPriceItems = cart.reduce(
    (acc, el) => acc + el.price_cents * el.quantity,
    0
  );
  const tax = (totalPriceItems * 8.82) / 100;
  const convenienceFee = 100;
  const totalPrice = totalPriceItems + tax + convenienceFee;
  const dispatch = useAppDispatch();
  return (
    <div className="h-full w-[1140px]">
      <Title>CART</Title>
      {cart.length > 0 ? (
        <div className="flex gap-5">
          <div className="max-h-[600px] overflow-x-auto">
            {cart.map((item) => (
              <div className="w-[610px] bg-[#F1D5BB]  px-5 py-6  flex justify-between items-center text-xl">
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
              <form>
                <input
                  type="text"
                  placeholder="enter promo code"
                  className="mt-8 px-3 py-4 w-full border-black border-2"
                />
                <button className="mt-8 bg-black text-white px-3  py-5 w-full">
                  Apply
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className=" text-center mt-20 font-bold text-3xl w-full">
          cart is empty
          <div className="mt-10">
            <GoToMenu />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
