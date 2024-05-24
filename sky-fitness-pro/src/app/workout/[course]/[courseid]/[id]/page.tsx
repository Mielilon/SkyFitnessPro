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
    courseid: string;
  };
};

export default function WorkoutPage({ params }: WorkoutPageType) {
  const [workoutId, setWorkoutId] = useState("");
  useEffect(() => {
    setWorkoutId(params.id);
  }, [params]);
  const courseName = params.course;
  const courseId = params.courseid;
  const [isOpen, setIsOpen] = useState(false);
  const [workout, setWorkout] = useState<WorkoutType | null>(null);
  const [rusName, setRusName] = useState("");
  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  const auth = getAuth(app);

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
  }, [courseName]);

  useEffect(() => {
    if (!auth.currentUser?.uid) return;
    return onValue(
      ref(
        database,
        `users/${auth.currentUser?.uid}/courses/${courseId}/workouts/${workoutId}/exercises/`
      ),
      (snapshot) => {
        if (snapshot.exists()) {
          const exercisesData: any = Object.values(snapshot.val());
          setExercises(exercisesData);
          console.log(exercisesData);
        } else {
          console.log("No data available");
        }
      }
    );
  }, [auth.currentUser?.uid, workoutId, courseId]);

  useEffect(() => {
    if (!auth.currentUser?.uid) return;
    return onValue(
      ref(
        database,
        `users/${auth.currentUser?.uid}/courses/${courseId}/workouts/${workoutId}`
      ),
      (snapshot) => {
        if (snapshot.exists()) {
          const workoutData: any = snapshot.val();
          setWorkout(workoutData);
        } else {
          console.log("No data available");
        }
      }
    );
  }, [auth.currentUser?.uid, workoutId, courseId]);

  return (
    <>
      <section>
        <Title label={rusName} />
        <Breadcrumbs text={workout ? workout.name : ""} />
        <div className="h-[189px] md:h-[639px] rounded-[30px] mb-6 lg:mb-10">
          <Suspense fallback={<p>Loading video...</p>}>
            <VideoComponent videoURL={workout ? workout.video : ""} />
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
                <WorkoutProgress
                  title={exercise.name}
                  progress={exercise.quantity.toString()}
                />
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
