import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/HomePage";
import AppLayout from "./app/AppLayout";
import MenuPage from "./pages/MenuPage";
import About from "./pages/AboutPage";
import Cart from "./pages/CartPage";
import MenuCategoryPage from "./pages/MenuCategoryPage";

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
