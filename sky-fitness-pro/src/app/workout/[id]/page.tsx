"use client";
import { app, database } from "@/app/firebase";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Button from "@/components/Button/Button";
import ProgressForm from "@/components/ProgressForm/ProgressForm";
import Title from "@/components/Title/Title";
import VideoComponent from "@/components/Video/Video";
import WorkoutProgress from "@/components/WorkoutProgress/WorkoutProgress";
import { labels, workoutProgress } from "@/lib/data";
import { getAuth } from "firebase/auth";
import { get, child, onValue, ref } from "firebase/database";
import { Suspense, useEffect, useState } from "react";

type WorkoutPageType = {
  params: {
    id: string;
  };
};

export default function WorkoutPage({ params }: WorkoutPageType) {
  const workoutId = params.id;
  const [isOpen, setIsOpen] = useState(false);

  function toggleProgressForm() {
    setIsOpen((prevState) => !prevState);
  }
  const auth = getAuth(app);
 useEffect(() => {
  return onValue(
    ref(database, `workouts/${workoutId}/exercises/`),
    (snapshot) => {
      if (snapshot.exists()) {
        const workoutList: any = Object.values(
          snapshot.val()
        )
        console.log(workoutList);
      } else {
        console.log("No data available");
      }
    }
  );
}, [workoutId]);

  // get(child(ref(database), `workouts/${workoutId}/exercises`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //     const arrAllWorkouts = Object.entries(snapshot.val());
  //     console.log(arrAllWorkouts);
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  return (
    <>
      <section>
        <Title label={"Йога"} />
        <Breadcrumbs
          /* Красота и здоровье / Йога на каждый день / 2 день */
          text="Красота и здоровье / Йога на каждый день / 2 день"
        />
        <div className="h-[189px] md:h-[639px] rounded-[30px] mb-6 lg:mb-10">
          <Suspense fallback={<p>Loading video...</p>}>
            <VideoComponent videoURL="https://www.youtube.com/embed/v-xTLFDhoD0" />
          </Suspense>
        </div>
      </section>
      <section className="rounded-[30px] p-[30px] lg:p-10 bg-white shadow-def ">
        <h2 className="text-[32px] text-black font-skyeng font-normal mb-[20px]">
          Упражнения тренировки 2
        </h2>
        <div className="grid grid-flow-row gap-6 items-end md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {workoutProgress.map((step, i) => {
            return (
              <div className="lg:w-[320px] w-[283px]" key={i}>
                <WorkoutProgress title={step.title} progress={step.process} />
              </div>
            );
          })}
        </div>
        <div className="lg:w-[320px] max-w-[283px] w-auto mt-10">
          <Button
            title="Заполнить свой прогресс"
            onClick={toggleProgressForm}
          />
        </div>
      </section>
      {isOpen && <ProgressForm labels={labels} />}
    </>
  );
}
