import { types } from "util";

type ButtonType = {
  title?: string;
  onClick?: () => void;
  type?: "submit";

};

export default function Button({ title, onClick, type }: ButtonType) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="justify-self-center font-roboto-400 rounded-full w-full h-[52px] px-5 bg-[#BCEC30] text-lg text-[#000000] hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]"
    >
      {title}
    </button>
  );
}
