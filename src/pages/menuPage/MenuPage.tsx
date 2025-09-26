import Title from "../../shared/ui/Title";
import { getCategoriesTable } from "../../shared/api/apiItems";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const MenuPage = () => {
  const [showMore, getShowMore] = useState(false);

  const {
    isPending,
    data: items,
    isError,
  } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const data = await getCategoriesTable();
      console.log(data);
      return data;
    },
  });

  if (isPending) return <h2>Loading....</h2>;
  if (isError) return <h2>Error</h2>;
  return (
    <div>
      <div className="">
        <Title>MENU</Title>

        <div
          className={`flex flex-wrap gap-2 text-center max-h-[600px] ${
            showMore ? "overflow-y-auto" : "overflow-y-hidden"
          } mt-5`}
        >
          {items?.map((item) => (
            <div
              className="w-[275px] cursor-pointer"
              key={item.id}
              onClick={() => console.log(item.slug)}
            >
              <div className="mb-2">
                <img className="w-full h-auto" src={item.img} alt={item.name} />
              </div>
              <div className="">
                <h3>{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!showMore && (
        <button
          onClick={() => getShowMore(!showMore)}
          className=" mt-5 py-4 px-8 bg-black text-white  block mx-auto"
        >
          show more
        </button>
      )}
    </div>
  );
};

export default MenuPage;
