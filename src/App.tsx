import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/HomePage/index";
import AppLayout from "./app/AppLayout";
import MenuPage from "./pages/MenuPage/index";
import About from "./pages/AboutPage/index";
import Cart from "./pages/CartPage/index";
import HotDeals from "./pages/HotDeals/index";
import MenuCategoryPage from "./pages/MenuCategoryPage/index";

const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/menu",
        element: <MenuPage />,
      },
      {
        path: "/menu/:slug",
        element: <MenuCategoryPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/hot-deals",
        element: <HotDeals />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
