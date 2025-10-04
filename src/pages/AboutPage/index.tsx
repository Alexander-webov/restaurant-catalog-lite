import React from "react";
import Title from "../../shared/ui/Title";
import { Link } from "react-router-dom";
import GoToMenu from "../../shared/ui/GoToMenu";

type Props = {};

const About = (props: Props) => {
  return (
    <div>
      <Title>About Us</Title>
      <div className="border-2 border-[#F1D5BB] mx-auto w-[900px] text-center p-16 text-2xl mt-12">
        Welcome to YA SUSCHI, a traditional Japanese restaurant in 6007 Bay
        Parkway Brooklyn, NY 11204! We serve the freshest and most authentic
        sushi in the city, made with love and precision by our experienced
        chefs. Our menu features a wide variety of sushi rolls. Each roll is
        crafted with the freshest ingredients, including super-premium fish like
        bluefin tuna, yellowtail, and eel, resulting in a truly sublime dining
        experience. We invite you to come and taste our sushi rolls. Let's
        indulge in the flavors of Japan at YA SUSCHI.
      </div>
      <div className="mt-10">
        <GoToMenu />
      </div>
    </div>
  );
};

export default About;
