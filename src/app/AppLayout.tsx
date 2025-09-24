import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "../widgets/sidebar/Sidebar";

const AppLayout = () => {
  return (
    <>
      <main className="max-w-[1440px] m-auto pt-11 pl-12 pb-5 pr-28 min-h-dvh h-dvh flex">
        <Sidebar />

        <div className="ml-12">
          <Outlet />
        </div>
      </main>
      <ScrollRestoration />
    </>
  );
};

export default AppLayout;
