import Image from "next/image";
import Button from "../Button/Button";

type CourseCardType = {
  imgURL: string,
  title: string,
}

export default function CourseCard({ imgURL, title }: CourseCardType) {

  return (
    <div className="relative w-[360px] bg-[#FFFFFF] rounded-[30px] hover:translate-y-1 hover:scale-105 duration-300 hover:shadow-lg ">
      <div className='relative'>
        <Image
          className='rounded-[30px] object-fill'
          src={`/img/${imgURL}.png`}
          alt={`${imgURL}`}
          width={350}
          height={360}
        />
        <svg className={`absolute w-[27px] right-[20px] z-10`} viewBox="0 0 27 27">
          <use xlinkHref={`/img/sprite.svg#icon-minus`}></use>
        </svg>
      </div>
      <div className="flex flex-col px-[30px] py-[25px] gap-y-5">
        <h2 className="text-[32px]">{title}</h2>
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
