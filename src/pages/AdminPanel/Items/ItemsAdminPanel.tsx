import type { ItemType } from "../../../entities/types";

type Props = {
  item: ItemType;
  removeCatOrItem: (nameTable: string, id: number) => void;
};

const ItemsAdminPanel = ({ item, removeCatOrItem }: Props) => {
  return (
    <div
      key={item.id}
      className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_2px_0_0_#000] hover:shadow-[0_4px_0_0_#000] transition-shadow flex flex-col justify-between"
    >
      {/* header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0 flex items-center">
          <img
            className="w-28 h-28 object-cover"
            src={item.image ?? undefined}
            alt={item.name}
          />

          <div className=" ml-5  uppercase text-sm">
            <div className="mb-2">
              name: <span className="text-green-900">{item.name}</span>
            </div>
            <div className="mb-2">
              category : <span className="text-green-900"> {item.slug}</span>
            </div>
            <div className="mb-2">
              description :{" "}
              <span className="text-green-900"> {item.description}</span>
            </div>
            <div className="mb-2">
              price cents :{" "}
              <span className="text-green-900"> {item.price_cents}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end"></div>
      </div>

      <button
        onClick={() => removeCatOrItem("items", item.id)}
        className="bg-red-800 mt-3 px-4 py-3 uppercase text-white"
      >
        remove item
      </button>
    </div>
  );
};

export default ItemsAdminPanel;
