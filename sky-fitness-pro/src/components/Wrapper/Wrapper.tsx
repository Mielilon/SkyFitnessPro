import { ReactNode } from "react";

type WrapperType = {
  children: ReactNode;
};

export default function Wrapper({ children }: WrapperType) {
  return <main className="flex flex-col justify-center mx-auto w-screen px-4 lg:max-w-[1440px] lg:px-[140px]  lg:pb-44">
    {children}
  </main>;
}
