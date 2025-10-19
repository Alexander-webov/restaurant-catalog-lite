import type { CategoryType } from "../../../entities/types";

type Props = {
  item: CategoryType;
  removeCatOrItem: (nameTable: string, id: number) => void;
};

const CategoryAdminPanel = ({ item, removeCatOrItem }: Props) => {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_2px_0_0_#000] hover:shadow-[0_4px_0_0_#000] transition-shadow flex flex-col justify-between">
      {/* header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0 flex items-center">
          <img
            className="w-28 h-28 object-cover"
            src={item.img}
            alt={item.name}
          />

          <div className=" ml-5 text-xl uppercase">
            <div className="mb-1">
              name: <span className="text-green-500">{item.name}</span>
            </div>
            <div>
              category: <span className="text-green-500"> {item.slug}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end"></div>
      </div>
      <button
        onClick={() => removeCatOrItem("categories", item.id)}
        className="bg-red-800 mt-3 px-4 py-3 uppercase text-white"
      >
        remove category
      </button>
    </div>
  );
};

export default CategoryAdminPanel;
