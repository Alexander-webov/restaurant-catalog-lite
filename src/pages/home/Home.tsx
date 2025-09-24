import bgImage from "../../assets/bg-main.jpg";
import Button from "../../shared/ui/ButtonLink";

const Home = () => {
  return (
    <main
      className="w-full min-h-dvh bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex justify-center items-center min-h-dvh flex-col max-w-[830px] mx-auto text-gray-50 text-center">
        <h1 className="text-6xl mb-12">
          Welcome to <span className="font-bold">YA SUSCHI</span> Restaurant
        </h1>
        <p className="mb-12 text-2xl">
          People eat with their eyes and Sushi creates an easy way for customers
          to order when they can see beautiful photos of your food
        </p>
        <div className="flex gap-8">
          <Button link="/about" bgColor="white" textColor="black">
            ABOUT
          </Button>
          <Button link="/menu" bgColor="white" textColor="black">
            MENU
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
