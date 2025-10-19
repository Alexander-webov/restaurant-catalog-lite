import { useQuery } from "@tanstack/react-query";
import {
  getCategoriesTable,
  getItemsTable,
  removefromTableCatOrItemy,
} from "../../shared/api/catalog";
import Protected from "../../widgets/Protected/Protected";
import { useState } from "react";
import AddCategoryForm from "./Category/AddCategoryForm";
import CategoryAdminPanel from "./Category/CategoryAdminPanel";
import ItemsAdminPanel from "./Items/ItemsAdminPanel";
import AddItemForm from "./Items/AddItemForm";

const AdminPanel = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [addItem, setAddItem] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await getCategoriesTable();
      return data;
    },
    refetchInterval: 3000,
    refetchOnWindowFocus: true,
  });
  const { data: items } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const data = await getItemsTable();
      return data;
    },
    refetchInterval: 3000,
    refetchOnWindowFocus: true,
  });

  function removeCatOrItem(nameTable: string, id: number) {
    if (!confirm("Do you want to remove this category")) return;
    removefromTableCatOrItemy(nameTable, id);
  }

  return (
    <Protected>
      <div className="mx-auto max-w-7xl px-4 py-6 bg-white text-black">
        <div className="mb-5 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Manager PANEL</h1>
        </div>

        {/* Categories */}
        <h2 className="text-2xl font-bold mt-10 mb-3">Categories</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className=" rounded-2xl border cursor-pointer border-black/10 bg-white p-5 shadow-[0_2px_0_0_#000] hover:shadow-[0_4px_0_0_#000] transition-shadow flex flex-col justify-between">
            {addCategory ? (
              <AddCategoryForm closeForm={setAddCategory} />
            ) : (
              <div className="mb-4 gap-4 h-full">
                <div className="flex text-5xl h-full">
                  <button
                    className="w-full h-full"
                    onClick={() => setAddCategory(true)}
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-col items-end"></div>
              </div>
            )}
          </div>
          {categories?.map((item) => {
            return (
              <CategoryAdminPanel
                key={item.id}
                item={item}
                removeCatOrItem={removeCatOrItem}
              />
            );
          })}
        </div>
        {/* Menu ITEMS */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mt-10 mb-3">Menu ITEMS</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className=" rounded-2xl border cursor-pointer border-black/10 bg-white p-5 shadow-[0_2px_0_0_#000] hover:shadow-[0_4px_0_0_#000] transition-shadow flex flex-col justify-between">
              {addItem ? (
                <AddItemForm closeForm={setAddItem} />
              ) : (
                <div className="mb-4 gap-4 h-full">
                  <div className="flex text-5xl h-full">
                    <button
                      className="w-full h-full"
                      onClick={() => setAddItem(true)}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-col items-end"></div>
                </div>
              )}
            </div>
            {items?.map((item) => {
              return (
                <ItemsAdminPanel
                  key={item.id}
                  item={item}
                  removeCatOrItem={removeCatOrItem}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default AdminPanel;
