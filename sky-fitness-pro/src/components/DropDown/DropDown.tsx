import Button from "../Button/Button";
import ButtonLink from "../ButtonLink/ButtonLink";

export default function DropDown() {
  return (
    <div className="absolute right-0 z-10 mt-3 md:mt-6 bg-white rounded-[30px] w-[266px] h-[258px] flex flex-col items-center gap-8">
      <div className="w-[206px] flex flex-col gap-2.5 text-center mt-[24px]">
        <p className="font-skyeng text-lg">Сергей</p>
        <p className="font-skyeng text-lg text-[gray]">sergey.petrov96@mail.ru</p>
      </div>
      <div className="w-[206px] flex flex-col gap-2.5">
        <Button title="Мой профиль" />
        <ButtonLink title="Выйти" link={"/"} />
      </div>
    </div>
  )
}