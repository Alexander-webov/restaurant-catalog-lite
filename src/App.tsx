import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import AppLayout from "./app/AppLayout";
import MenuPage from "./pages/menuPage/MenuPage";

const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "menu",
        element: <MenuPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
