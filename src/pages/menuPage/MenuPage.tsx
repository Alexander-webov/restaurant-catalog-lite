import { useEffect } from "react";
import Title from "../../shared/ui/Title";
import { getItemsTable } from "../../shared/api/apiItems";
import { useQuery } from "@tanstack/react-query";

const MenuPage = () => {
  const {
    isPending,
    data: items,
    isError,
  } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const data = await getItemsTable();
      return data;
    },
  });

  if (isPending) return <h2>Loading....</h2>;
  if (isError) return <h2>Error</h2>;
  return (
    <div>
      <div className="">
        <Title>SUSHI FOOD</Title>

        <div className="">
          {items?.map((item) => (
            <div>{item.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
