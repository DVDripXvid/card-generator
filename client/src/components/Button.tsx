import { FC } from "react";

interface IProps {
  text: string;
  onClick: () => void;
}

const Button: FC<IProps> = (props) => {
  const { text, onClick } = props;

  return (<button
    onClick={onClick}
    className="focus:outline-none hover:bg-purple-700 bg-purple-900 px-2 py-1 rounded-lg">{text}
  </button>
  );
};

export default Button;