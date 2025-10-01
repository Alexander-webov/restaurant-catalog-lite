import {
  ArrowRightStartOnRectangleIcon,
  HomeIcon,
  MapPinIcon,
  ShoppingCartIcon,
  SquaresPlusIcon,
} from "@heroicons/react/16/solid";
import Logo from "../../assets/S..svg";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav>
      <ul className="main-menu text-white bg-slate-950  py-12 max-h-[860px] h-5/6 max-w-40 text-center rounded-3xl flex flex-col items-center justify-between min-h-96 overflow-x-auto">
        <li className="w-20 flex justify-center">
          <img src={Logo} alt="S" />
        </li>
        <li>
          <NavLink className="flex justify-center p-2" to="/">
            <HomeIcon className="w-14 h-14" />
            <span className="sr-only">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="flex justify-center p-2" to="/menu">
            <SquaresPlusIcon className="w-14 h-14" />
            <span className="sr-only">menu</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="flex justify-center p-2" to="/cart">
            <ShoppingCartIcon className="w-14 h-14" />
            <span className="sr-only">cart</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="flex justify-center p-2" to="/about">
            <MapPinIcon className="w-14 h-14" />
            <span className="sr-only">about</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="flex justify-center p-2" to="/">
            <ArrowRightStartOnRectangleIcon className="w-14 h-14" />
            <span className="sr-only">Home</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
