import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type BoxType = {
  children: React.ReactNode;
};

const SkeletonView = () => {
  return (
    <Skeleton
      wrapper={Box}
      containerClassName="flex flex-wrap gap-8"
      count={8}
    />
  );
};

function Box({ children }: BoxType) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        display: "inline-block",
        lineHeight: 2,
        padding: "1rem",
        width: 250,
        gap: "8rem",
        height: 250,
      }}
    >
      {children}
    </div>
  );
}
export default SkeletonView;
