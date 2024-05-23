"use client";
import { app, database } from "@/app/firebase";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Button from "@/components/Button/Button";
import ProgressForm from "@/components/ProgressForm/ProgressForm";
import Title from "@/components/Title/Title";
import VideoComponent from "@/components/Video/Video";
import WorkoutProgress from "@/components/WorkoutProgress/WorkoutProgress";
import { labels } from "@/lib/data";
import { ExerciseType, WorkoutType } from "@/utils/writeUserData";
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { Suspense, useEffect, useState } from "react";

type WorkoutPageType = {
  params: {
    id: string;
    course: string;
  };
};

export default function WorkoutPage({ params }: WorkoutPageType) {
  const workoutId = params.id;
  const courseName = params.course;
  const [isOpen, setIsOpen] = useState(false);
  const [workout, setWorkout] = useState<string[] | null>(null);
  const [rusName, setRusName] = useState('');
  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  function toggleProgressForm() {
    setIsOpen((prevState) => !prevState);
  }
  useEffect(() => {
    switch (courseName) {
      case "BodyFlex":
        setRusName("Бодифлекс");
        break;
      case "DanceFitness":
        setRusName("Танцевальный фитнес");
        break;
      case "StepAirobic":
        setRusName("Степ-аэробика");
        break;
      case "Stretching":
        setRusName("Стретчинг");
        break;
      case "Yoga":
        setRusName("Йога");
        break;
      default:
        setRusName("");
    }
  }, [courseName])

  const auth = getAuth(app);
  useEffect(() => {
    return onValue(
      ref(database, `workouts/${workoutId}/`),
      (snapshot) => {
        if (snapshot.exists()) {
          const workoutData: any = Object.values(
            snapshot.val()
          )
          setWorkout(workoutData);
          setExercises(workoutData[1])
          console.log(workoutData);
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
        <Title label={rusName} />
        <Breadcrumbs
          text={workout ? workout[2] : ''}
        />
        <div className="h-[189px] md:h-[639px] rounded-[30px] mb-6 lg:mb-10">
          <Suspense fallback={<p>Loading video...</p>}>
          <VideoComponent videoURL={workout ? workout[3] : ''} />
          </Suspense>
        </div>
      </section>
      <section className="rounded-[30px] p-[30px] lg:p-10 bg-white shadow-def ">
        <h2 className="text-[32px] text-black font-skyeng font-normal mb-[20px]">
          Упражнения тренировки
        </h2>
        <div className="grid grid-flow-row gap-6 items-end md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {exercises.map((exercise, i) => {
            return (
              <div className="lg:w-[320px] w-[283px]" key={i}>
                <WorkoutProgress title={exercise.name} progress={exercise.quantity} />
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
