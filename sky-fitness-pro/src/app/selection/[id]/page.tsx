'use client';
import { app, database } from '@/app/firebase';
import Button from '@/components/Button/Button';
import WorkoutItem from '@/components/WorkoutItem/WorkoutItem';

import { WorkoutType } from '@/utils/writeUserData';
import { User, getAuth } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type SelectionPageType = {
  params: {
    id: string;
  };
};

export default function SelectionPage({ params }: SelectionPageType) {
  const [courseId, setCourseId] = useState('');
  const auth = getAuth(app);
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [courseName, setCourseName] = useState('');
  const [selected, setSelected] = useState('');
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(user);
      }
    });
  }, [auth]);

  useEffect(() => {
    setCourseId(params.id);
  }, [params]);

  useEffect(() => {
    if (!auth.currentUser?.uid) return;
    return onValue(
      ref(database, `users/${auth.currentUser?.uid}/courses/${courseId}/`),
      snapshot => {
        if (snapshot.exists()) {
          const course: any = Object.values(snapshot.val());
          setCourseName(course[1]);
          const workoutList: WorkoutType[] = Object.values(course[4]);
          workoutList.sort((a, b) => (a.name > b.name ? 1 : -1));
          setWorkouts(workoutList);
        } else {
          console.log('No data available');
        }
      },
    );
  }, [auth.currentUser?.uid, params.id, courseId]);

  return (
    <>
      <div className="bg-[#FFFFFF] rounded-[30px]  lg:w-[460px] w-[343px] lg:h-[609px] h-[585px]">
        <h2 className="lg:ml-[0px] ml-[31px] lg:mt-[35px] mt-[24px] font-StratosSkyeng-400 text-[32px] leading-[36px] lg:text-center text-left">
          Выберите тренировку
        </h2>
        <div className="lg:mt-[37px] mt-[34px] lg:ml-[28px] ml-[21px] flex flex-col gap-[20px]">
          <div className="lg:w-[392px] w-[292px]  lg:h-[380px] h-[354px]">
            <ul className="h-[350px] overflow-auto">
              {workouts?.map((workout, i) => {
                const shortWorkoutName = workout.name.split('/')[0];
                return (
                  <WorkoutItem
                    setSelected={setSelected}
                    workoutName={shortWorkoutName}
                    key={i}
                    id={workout._id}
                  />
                );
              })}
            </ul>
          </div>
          <div className="lg:w-[390px] w-[283px]">
            <Button
              title="Начать"
              onClick={() =>
                router.replace(`/workout/${courseName}/${courseId}/${selected}`)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
