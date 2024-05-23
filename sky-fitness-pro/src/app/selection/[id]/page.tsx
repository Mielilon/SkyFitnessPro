'use client'
import { app, database } from "@/app/firebase";
import Button from "@/components/Button/Button";
import WorkoutItem from "@/components/WorkoutItem/WorkoutItem";
import { workouts } from "@/lib/data";
import { UserWorkoutType, WorkoutType } from "@/utils/writeUserData";
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SelectionPageType = {
  params: {
    id: string;
  };
};

export default function SelectionPage({ params }: SelectionPageType) {
  const courseId = params.id;
  const auth = getAuth(app);
  const [workouts, setWorkouts] = useState<UserWorkoutType[] | null>(null);
  const [courseName, setCourseName] = useState('');
  const [selected, setSelected] = useState('');
  const router = useRouter();
  useEffect(() => {
    // if (!auth.currentUser?.uid) return;
    // return onValue(
    //   ref(database, `users/${auth.currentUser?.uid}/courses/${courseId}/workouts`),
    //   (snapshot) => {
    //     if (snapshot.exists()) {
    //       const workoutList: any = Object.values(
    //         snapshot.val()
    //       )
    //       setWorkouts(workoutList);
    //       console.log(workoutList);
    //     } else {
    //       console.log("No data available");
    //     }
    //   }
    // );
    if (!auth.currentUser?.uid) return;
    return onValue(
      ref(database, `users/${auth.currentUser?.uid}/courses/${courseId}/`),
      (snapshot) => {
        if (snapshot.exists()) {
          const course: any = Object.values(
            snapshot.val()
          )
          setCourseName(course[1]);
          setWorkouts(course[4]);
         console.log(course[1]);
        } else {
          console.log("No data available");
        }
      }
    );
  }, [auth.currentUser?.uid, courseId]);


  return (
    <>
      <div className="bg-[#FFFFFF] rounded-[30px]  lg:w-[460px] w-[343px] lg:h-[609px] h-[585px]" >
        <h2 className="lg:ml-[0px] ml-[31px] lg:mt-[35px] mt-[24px] font-StratosSkyeng-400 text-[32px] leading-[36px] lg:text-center text-left">
          Выберите тренировку
        </h2>
        <div className="lg:mt-[37px] mt-[34px] lg:ml-[28px] ml-[21px] flex flex-col gap-[20px]">
          <div className="lg:w-[392px] w-[292px]  lg:h-[380px] h-[354px]">
            <ul className="h-[350px] overflow-auto">
              {workouts?.map((workout, i) => {
                const shortWorkoutName = workout[1].name.split("/")[0];
                return <WorkoutItem setSelected={setSelected} workoutName={shortWorkoutName} key={i} id={workout[0]} />
              })}
            </ul>
          </div>
          <div className="lg:w-[390px] w-[283px]">
            <Button title="Начать" onClick={() => router.replace(`/workout/${courseName}/${courseId}/${selected}`)} />
          </div>
        </div>
      </div>
    </>
  );
}
