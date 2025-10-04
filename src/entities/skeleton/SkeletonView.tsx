import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import type { FC, ReactNode } from "react";

type BoxProps = {
  children?: ReactNode;
};

const Box: FC<BoxProps> = ({ children }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 2,
        padding: "1rem",
        width: 250,
        height: 250,
        gap: "8rem",
      }}
    >
      {children}
    </div>
  );
};

const SkeletonView: FC = () => {
  return (
    <Skeleton
      wrapper={Box}
      containerClassName="flex flex-wrap gap-8"
      count={8}
    />
  );
};

export default SkeletonView;
