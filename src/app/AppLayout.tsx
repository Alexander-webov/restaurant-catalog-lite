import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "../widgets/sidebar/Sidebar";

const AppLayout = () => {
  return (
    <>
      <main className="max-w-[1300px] m-auto min-h-dvh h-dvh flex p-5">
        <Sidebar />

        <div className="xl:ml-12 ml-2">
          <Outlet />
        </div>
      </main>
      <ScrollRestoration />
    </>
  );
};

export default AppLayout;
