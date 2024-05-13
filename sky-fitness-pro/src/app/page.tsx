import Button from "@/components/Button/Button";
import CourseCard from "@/components/CourseCard/CourseCard";
import Link from "next/link";

export default function MainCoursesPage() {
  return (
    <>
      <div id="top" className="flex flex-row lg:mb-[50px] mb-[34px] items-end space-x-7">
        <h1 className="font-roboto-500 max-w-[840px] text-[32px] md:text-[40px]/[60px] xl:text-[60px]/[60px] text-pretty">
          Начните заниматься спортом
          <br /> и улучшите качество жизни
        </h1>
        <svg className="hidden lg:block sm:h-[120px]">
          <use xlinkHref={`/img/sprite.svg#icon-notice`}></use>
        </svg>
      </div>
      <div className="flex flex-wrap gap-x-10 gap-y-8">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
      <div className="flex self-center w-[140px] mt-8">
        <Link href="#top">
          <Button title="Наверх &#8593;" />
        </Link>
      </div>
    </>
  );
}
