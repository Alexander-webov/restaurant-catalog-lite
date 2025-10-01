import { Link } from "react-router-dom";
import fallback from "../../assets/empty.png";
import type { Category } from "./types";

type Props = {
  category: Category;
};

const Category = ({ category }: Props) => {
  return (
    <Link to={`/menu/${category.slug}`}>
      <div className="w-[275px] h-[300px] cursor-pointer relative bg">
        <div className="mb-2 w-[250px] h-[250px] mx-auto">
          <img
            className=""
            src={category.img === "" ? fallback : category.img}
            alt={category.name}
          />
        </div>
        <div>
          <h3 className="">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Category;
