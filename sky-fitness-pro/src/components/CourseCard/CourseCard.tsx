import Image from "next/image";
import Button from "../Button/Button";
import Link from "next/link";
import WorkoutProgress from "../WorkoutProgress/WorkoutProgress";
import { removeSubscribedCourse } from "@/utils/removeSubscribedCourse";
import { writeUserData } from "@/utils/writeUserData";
import { getAuth } from "firebase/auth";
import { CourseType } from "@/app/course/[id]/page";
import { useRouter } from "next/navigation";

type CourseCardType = {
  imgURL: string;
  title: string;
  isSubscribed: boolean;
  progress?: number;
  courseId: string;
  course: CourseType;
};

export default function CourseCard({
  course,
  courseId,
  progress = 0,
  isSubscribed,
  imgURL,
  title,
}: CourseCardType) { 

  const router = useRouter();

  async function handlerAddCourse(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    e.stopPropagation();

    const userId = getAuth(); 

    if (!userId.currentUser) return router.replace("/signin");

    await writeUserData({ userId: userId.currentUser?.uid, courseId, course })
  }


  return (
    <div onClick={() => router.replace(`/course/${courseId}`)} className="relative w-[360px] bg-[#FFFFFF] rounded-[30px] hover:translate-y-1 hover:scale-105 duration-300 hover:shadow-lg ">
      <div>
        <Image
          className="rounded-[30px]"
          src={`/img/${imgURL}.png`}
          alt={`${imgURL}`}
          width={560}
          height={550}
          priority={true}
        />

        {isSubscribed ? (
          <svg onClick={() => removeSubscribedCourse(courseId)} className="absolute w-[27px] right-[20px] top-[20px] z-10">
            <use xlinkHref={`/img/sprite.svg#icon-minus`}></use>
          </svg>
        ) : (
          <svg onClick={(e) => handlerAddCourse(e)} className="absolute w-[27px] right-[20px] top-[20px] z-10">
            <use xlinkHref={`/img/sprite.svg#icon-plus`}></use>
          </svg>
        )}

      </div>
      <div className="flex flex-col px-[30px] py-[25px] gap-y-5">
        <h2 className="font-roboto-500 text-[32px]">{title}</h2>
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
        {isSubscribed && (
          <div className="flex flex-col gap-10">
            <WorkoutProgress title="Прогресс" progress={progress} />
            <Link href={`/selection/${courseId}`}>
              <Button title="Продолжить" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
