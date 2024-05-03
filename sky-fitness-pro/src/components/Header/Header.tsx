import Link from "next/link";
import Image from "next/image";
import logoImg from "./logo.svg"

export default function Header() {
  return (
    <>
      <div className="bg-[#FFFFFF] py-14 flex justify-between">
        <div>
          <Link href={"/"}>
            <div>
              <Image src={logoImg} alt="logo" width={220} height={35} />
            </div>
          </Link>
          <p className="pt-3.5 text-[#585959]">Онлайн-тренировки для занятий дома</p>
        </div>
        <button>Войти</button>
      </div>
    </>
  )
}