import { Link } from "react-router-dom";
import fallback from "../../assets/empty.png";
import type { CategoryType } from "./types";

type Props = {
  category: CategoryType;
};

const Category = ({ category }: Props) => {
  return (
    <Link to={`/menu/${category.slug}`}>
      <div className="cursor-pointer relative mx-3">
        <div className="mb-2 w-[224px] h-[275px] mx-auto">
          <img
            className="h-full w-full object-cover rounded-lg"
            src={category.img === "" ? fallback : category.img}
            alt={category.name}
          />
        </div>
        <div>
          <h3 className="font-bold text-xl">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Category;
