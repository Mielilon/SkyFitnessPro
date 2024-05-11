import Image from "next/image";
import Button from "../Button/Button";

export default function CourseCard() {
  return (
    <div className="relative w-[360px] bg-[#FFFFFF] rounded-[30px]">
      <div>
        <Image
          className="rounded-[30px]"
          src="/img/yoga.png"
          alt="yoga"
          width={360}
          height={350}
        />
        {/* В зависимости от добавленного курса будет меняться svg картинка */}

        {/* <svg className="absolute -right-[250px] top-[20px] z-10">
          <use xlinkHref={`/img/sprite.svg#icon-plus`}></use>
        </svg> */}
        <svg className="absolute -right-[250px] top-[20px] z-10">
          <use xlinkHref={`/img/sprite.svg#icon-minus`}></use>
        </svg>
      </div>
      <div className="flex flex-col px-[30px] py-[25px] gap-y-5">
        <h2 className="text-[32px]">Стретчинг</h2>
        <div className="flex flex-wrap gap-1.5">
          <div className="flex shrink-0 items-center gap-x-1.5 bg-[#F7F7F7] rounded-[30px] p-[10px]">
            <svg className="w-[16px] h-[16px]">
              <use xlinkHref={`/img/sprite.svg#icon-calendar`}></use>
            </svg>
            <p className="text-base">25 дней</p>
          </div>
          <div className="flex shrink-0 items-center gap-x-1.5 bg-[#F7F7F7] rounded-[30px] p-[10px]">
            <svg className="w-[16px] h-[16px]">
              <use xlinkHref={`/img/sprite.svg#icon-time`}></use>
            </svg>
            <p className="text-base">20-50 мин/день</p>
          </div>
          <div className="flex shrink-0 items-center gap-x-1.5 bg-[#F7F7F7] rounded-[30px] p-[10px]">
            <svg className="w-[16px] h-[16px]">
              <use xlinkHref={`/img/sprite.svg#icon-level`}></use>
            </svg>
            <p className="text-base">Сложность</p>
          </div>
        </div>
        <div className="space-y-10">
          {/* Здесь будет прогресс, жду Таню */}
          {/* <WorkoutStep title={} progress={}/> */}
          <Button title="Test" />
        </div>
      </div>
    </div>
  );
}
