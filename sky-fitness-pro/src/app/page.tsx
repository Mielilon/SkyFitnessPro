"use client";
import Button from "@/components/Button/Button";
import CourseCard from "@/components/CourseCard/CourseCard";
import { onValue, ref } from "firebase/database";
import Link from "next/link";
import { database } from "./firebase";
import { useEffect, useState } from "react";

type CoursesArrayType = [string, CourseType][];
type CourseType = {
  _id: string;
  description: string;
  directions: string[];
  fitting: string[];
  nameEN: string;
  nameRU: string;
  order: number;
  workouts: string[];
};

export default function MainCoursesPage() {
  const [courses, setCourses] = useState<CoursesArrayType>([]);
  useEffect(() => {
    const coursesDB = ref(database, "courses");
    return onValue(coursesDB, (snapshot) => {
      if (snapshot.exists()) {
        const coursesArray: CoursesArrayType = Object.entries(snapshot.val());
        setCourses(coursesArray);
      } else {
        alert("Извините, курсы не найдены, либо нет подключения к интернету");
        return;
      }
    });
  }, []);

  return (
    <>
          {/* <div
        id="top"
        className="flex flex-row lg:mb-[50px] mb-[34px] items-end space-x-7"
      >
        <h1 className="font-roboto-500 max-w-[840px] text-[32px] md:text-[40px]/[60px] xl:text-[60px]/[60px] text-pretty">
          Начните заниматься спортом
          <br /> и улучшите качество жизни
        </h1>
        <svg className="hidden lg:block sm:h-[120px]">
          <use xlinkHref={`/img/sprite.svg#icon-notice`}></use>
        </svg>
      </div> */}
      <div
        id="top"
        className="flex flex-col md:flex-row  items-start main:gap-5"
      >
        <h1 className="mb-[34px] lg:mb-[50px] font-roboto-500 w-min-[327px] lg:w-[700px] main:w-[850px] text-[32px] md:text-[40px] main:text-[60px]  leading-[110%]">
          Начните заниматься спортом и улучшите качество жизни
        </h1>
        <p className="hidden lg:block w-[288px] h-[120px] py-4 main:px-5 px-4 font-roboto-400 main:text-[32px] leading-none  text-[28px] bg-notice bg-cover bg-no-repeat bg-center pb-8 align-middle">
          Измени своё тело за полгода!
        </p>
      </div>
      <div className="flex flex-wrap gap-6 lg:gap-x-10 lg:gap-y-8">
        {courses.map((course) => {
          return (
            <CourseCard
              key={course[1]._id}
              courseId={course[1]._id}
              course={course[1]}
              isSubscribed={false}
              imgURL={course[1].nameEN}
              title={course[1].nameRU}
            />
          );
        })}
      </div>
      <div className="flex self-center w-[140px] mt-8">
        <Link href="#top">
          <Button title="Наверх &#8593;" />
        </Link>
      </div>
    </>
  );
}
