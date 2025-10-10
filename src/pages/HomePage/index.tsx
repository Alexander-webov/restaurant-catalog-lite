import bgImage from "../../assets/bg-main.jpg";
import Button from "../../shared/ui/ButtonLink";
import BigLogo from "../../assets/big-logo.png";

const Home = () => {
  return (
    <main
      className="w-full min-h-dvh bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex justify-center items-center min-h-dvh flex-col max-w-[830px] mx-auto text-gray-50 text-center">
        <div className="w-56 md:w-full flex justify-center">
          <img src={BigLogo} alt="logo" />
        </div>
        <h1 className="text-6xl mb-12">Welcome!</h1>
        <p className="mb-12 text-2xl max-w-[485px] px-5">
          Explore our menu, choose your favorites, and place your order in just
          a few taps.
        </p>
        <div className="flex gap-8 flex-wrap justify-center">
          <Button link="/about" bgColor="white" textColor="black">
            About
          </Button>
          <Button link="/menu" bgColor="white" textColor="black">
            Tap to Order
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
