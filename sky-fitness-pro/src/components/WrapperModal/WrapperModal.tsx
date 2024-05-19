import Link from "next/link";
import logoImg from "../../../public/logo.svg";
import Image from "next/image";


export type WrapperModalType = {
  children: JSX.Element[],
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function WrapperModal({ children, onSubmit }: WrapperModalType) {
  return (
    <div className="w-[100%] min-h-[100%]">
      {/* цвет фона чет не работает */}
      <div className="relative mx-auto max-w-[100%] h-[100vh] bg-[rgba(0, 0, 0, 0.157)]">
        <div className="absolute z-10 mx-auto left-[calc(50%-(366px/2))] top-[calc(50%-(439px/2))]">
          <form className="w-[366px] bg-[#FFFFFF] rounded-[30px] px-[31px] md:px-[40px] py-[40px]" action="#"
            onSubmit={(event) => onSubmit(event)}>
            <Link href="/">
              <Image src={logoImg} alt="logo" width={222} height={35} className="mb-12 mx-auto w-auto h-auto" />
            </Link>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}

export default WrapperModal;
