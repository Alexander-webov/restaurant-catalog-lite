import React from "react";

type Props = {};

const Item = ({ img }: Props) => {
  return (
    <div>
      <img src={img} alt="" />
    </div>
  );
};

export default Item;
