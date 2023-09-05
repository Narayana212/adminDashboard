import { FC } from "react";

interface HeadingProps {
  text: string;
}

const Heading: FC<HeadingProps> = ({ text }) => {
  return <h1 className="text-3xl font-semibold">{text}</h1>;
};

export default Heading;
