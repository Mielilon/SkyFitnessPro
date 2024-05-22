"use client";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { workoutDescription } from "@/lib/data";
import { app, database } from "@/app/firebase";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { writeUserData } from "@/utils/writeUserData";
import sendNotification from "@/utils/sendNotification";

type CoursePageType = {
  params: {
    id: string;
  };
};

export type CourseType = {
  _id: string;
  description: string;
  directions: string[];
  fitting: string[];
  nameEN: string;
  nameRU: string;
  order: number;
  workouts: string[];
};

export default function CoursePage({ params }: CoursePageType) {
  const courseId = params.id;
  const [course, setCourse] = useState<CourseType>({
    _id: "",
    description: "",
    directions: ["", "", ""],
    fitting: ["", "", ""],
    nameEN: "",
    nameRU: "",
    order: 0,
    workouts: ["", "", ""],
  });

  const [color, setColor] = useState("bg-yellow");

  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const courseDbRef = ref(database, "courses/" + courseId);
    return onValue(courseDbRef, (snapshot) => {
      if (snapshot.exists()) {
        const courseData = snapshot.val();
        setCourse(courseData);
      } else {
        alert("Извините, курсы не найдены, либо нет подключения к интернету");
        return;
      }
    });
  }, [courseId]);
  useEffect(() => {
    switch (course.nameEN) {
      case "BodyFlex":
        setColor("bg-purple");
        break;
      case "DanceFitness":
        setColor("bg-orange");
        break;
      case "StepAirobic":
        setColor("bg-salmon");
        break;
      case "Stretching":
        setColor("bg-blue-dark");
        break;
      case "Yoga":
        setColor("bg-yellow");
        break;
      default:
        setColor("bg-yellow");
    }
  }, [course]);



  return (
    <>
      <div id="notification-box" className="flex fixed flex-col items-center justify-center top-0 z-50 p-3">
        {/* <!-- Notification container --> */}
      </div>
      <section
        className={`relative w-auto h-[389px] lg:h-[310px] rounded-[30px] ${color} overflow-hidden`}
      >
        <h1 className="font-roboto-500 hidden text-6xl md:block font-medium text-white mb-[10px] pt-[40px] pl-[40px]">
          {course.nameRU}
        </h1>
        <Image
          className="absolute top-[45px] right-[10px] lg:right-[1px] md:right-[10px] lg:top-[-80px] md:top-[10px]
          w-[360px] h-[350px]
  lg:w-[410px] lg:h-[400px]"
          src={`/img/${course.nameEN}.jpeg`}
          alt="yoga"
          width={360}
          height={350}
          priority={true}
        />
      </section>
      <section className="my-[40px] lg:my-[60px] ">
        <h2 className="font-roboto-500 text-black text-2xl md:text-5xl mb-[24px] lg:mb-[40px]">
          Подойдет для вас, если:
        </h2>
        <div className="flex flex-col md:flex-row gap-[17px]">
          {course.fitting.map((el, i) => {
            return (
              <div
                key={i}
                className="p-[20px] w-fit h-[141] bg-black rounded-[30px] flex flex-row gap-[15px] md:gap-[25px] items-center"
              >
                <p className="text-lime font-roboto-500 text-7xl">{i + 1}</p>
                <p className="text-lg lg:text-2xl text-white">{el}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="z-10">
        <h2 className="font-roboto-500 text-black text-2xl md:text-5xl mb-[24px] lg:mb-[40px]">
          Направления:
        </h2>
        <ul className="p-[30px] flex flex-col gap-y-[20px] md:grid md:grid-cols-2 md:gap-y-[22px] 
        lg:grid-cols-3 w-auto h-[336px] md:h-[195px] lg:h-[206px] xl:h-[146px] rounded-[30px] bg-lime">
          {course.directions.map((el, i) => {
            return (
              <li
                className="before:content-['\2726'] font-roboto-500 text-lg md:text-2xl text-black md:pr-[127px] md:grow md:text-center"
                key={i}
              >
                <span className="relative left-[8px]">{el}</span>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="z-10 mt-[156px] xl:mt-[102px] md:mt-[256px]">
        <div className="rounded-[30px] p-[40px] md:p-[30px] lg:p-10 bg-white shadow-def">
          <div className="max-w-[465px] flex flex-col xl:relative xl:z-20">
            <h2 className="text-[32px] md:text-5xl text-black font-roboto-500 leading-none mb-[28px]">
              Начните путь <br /> к новому телу
            </h2>
            <div className="mb-[28px] h-[178px] relative">
              <ul className="flex flex-col list-inside">
                {workoutDescription.map((el) => {
                  return (
                    <li
                      className="list-disc space-y-3 font-roboto-400 text-[#585959] leading-none text-lg md:text-2xl md:pl-6"
                      key={el}
                    >
                      {el}
                    </li>
                  );
                })}
              </ul>
            </div>
            <Button
              title="Добавить курс"
              onClick={() => {
                writeUserData({ userId: currentUser?.uid, courseId, course })
                sendNotification('info', 'Вы добавили курс!')
              }}
            />
          </div>
          <div
            className="relative xl:z-10 -z-10 flex justify-end
            xl:bottom-[550px] md:bottom-[730px] bottom-[650px] 
            lg:left-[30px] md:left-[0px] left-[60px]"
          >
            <Image
              className="[clip:rect(auto,auto,390px,auto)] lg:[clip:rect(auto,auto,450px,auto)] right-[35px] top-[70px]
              md:-right-[10px] md:top-[140px] absolute 
              xl:-right-[40px] xl:top-[140px] lg:-right-[30px] lg:top-[130px] "
              src="/img/lines.svg"
              alt="green and black line"
              width={738}
              height={574}
            />
            <Image
              className="absolute w-[519px] h-[539px]"
              src="/img/Runner.svg"
              alt="runner"
              width={519}
              height={539}
            />
          </div>
        </div>
      </section>
    </>
  );
}
