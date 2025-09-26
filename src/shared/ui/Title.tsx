type Props = {
  children: React.ReactNode;
};

const Title = ({ children }: Props) => {
  return (
    <div className="uppercase text-5xl mb-2 w-full ">
      <h2 className="">{children}</h2>
    </div>
  );
};

export default Title;
