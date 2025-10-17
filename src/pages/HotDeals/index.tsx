import Title from "../../shared/ui/Title";
import Coupon from "../../assets/Coupon.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getDiscount } from "../../features/promo/promoSlice";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { selectCartQuantity } from "../../features/cart/cart.selectors";
import toast from "react-hot-toast";

const HotDeals = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCartQuantity);

  function handelCoupon() {
    const text = "welcome25";
    try {
      navigator.clipboard.writeText(text);
      toast.success(`code is copied`);
    } catch (err) {
      toast.success(`Copy failed ${err}`);
    }

    dispatch(getDiscount({ code: "welcome25" }));
  }

  return (
    <div className="w-full">
      <div className="flex items-center ">
        <Title>HOT DEALS</Title>
        <div className="sm:text-3xl text-xl md:ml-14  ml-2 border-dashed border-[#F1D5BB] border-2 p-2">
          Tap to copy
        </div>
        <div className="flex flex-1 md:ml-10 ml-2">
          <Link
            className="bg-black text-white px-5 py-3 ml-5 flex items-center"
            to="/cart"
          >
            <ShoppingCartIcon width={30} />
            <span className="ml-1">{count}</span>
          </Link>
        </div>
      </div>
      <ul className="mt-10">
        <li className="mb-5 cursor-pointer">
          <button onClick={handelCoupon}>
            <img src={Coupon} alt="Coupon" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HotDeals;
