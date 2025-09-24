type Props = {
  children: React.ReactNode;
};

const Title = ({ children }: Props) => {
  return (
    <>
      <h2 className="uppercase text-5xl mb-2">{children}</h2>
      <span className="h-1 rounded-2xl w-full bg-[#F1D5BB] block"></span>
    </>
  );
};

export default Title;
