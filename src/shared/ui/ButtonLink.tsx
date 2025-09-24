import React from "react";
import { Link } from "react-router-dom";

type Props = {
  link: string;
  bgColor?: "black" | "white";
  textColor?: "black" | "white";
  children: React.ReactNode;
};

const ButtonLink = ({ link, children, bgColor, textColor }: Props) => {
  const classTextColor = textColor === "white" ? "text-white" : "text-black";
  const classBgColor = bgColor === "black" ? "bg-black" : "bg-white";

  return (
    <Link
      className={`text-2xl font-light ${classTextColor} ${classBgColor} px-20 py-5`}
      to={link}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
