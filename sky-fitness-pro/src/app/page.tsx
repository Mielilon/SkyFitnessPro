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
    onValue(coursesDB, (snapshot) => {
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
      <div
        id="top"
        className="flex flex-row lg:mb-[50px] mb-[34px] items-end space-x-7"
      >
        {/* <Link href="/signin">Modal</Link> */}
        <h1 className="font-roboto-500 max-w-[840px] text-[32px] md:text-[40px]/[60px] xl:text-[60px]/[60px] text-pretty">
          Начните заниматься спортом
          <br /> и улучшите качество жизни
        </h1>
        <svg className="hidden lg:block sm:h-[120px]">
          <use xlinkHref={`/img/sprite.svg#icon-notice`}></use>
        </svg>
      </div>
      <div className="flex flex-wrap gap-x-10 gap-y-8">
        {courses.map((course) => {
          return (
            <Link key={course[1]._id} href={`/course/${course[1]._id}`}>
              <CourseCard imgURL={course[1].nameEN} title={course[1].nameRU} />
            </Link>
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
