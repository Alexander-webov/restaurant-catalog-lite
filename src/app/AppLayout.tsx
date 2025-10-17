import { Outlet, ScrollRestoration } from "react-router-dom";
import Sidebar from "../widgets/sidebar/Sidebar";
import { Toaster } from "react-hot-toast";

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

      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          className: "text-2xl",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default AppLayout;
