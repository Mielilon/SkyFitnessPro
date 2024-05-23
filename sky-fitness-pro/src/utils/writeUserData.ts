import { CourseType } from "@/app/course/[id]/page";
import { database } from "@/app/firebase";
import { child, get, ref, set } from "firebase/database";

type WriteUserDataType = {
  userId: string | undefined;
  courseId: string;
  course: CourseType;
};
export type UserWorkoutType = [string, { name: string; video: string; _id: string, exercises: ExerciseType[] }];
export type ExerciseType = { name: string, quantity: number };
export type WorkoutType = { 0: string[]; 1: string[]; 2: string[], 3: ExerciseType[] };

export async function writeUserData({ userId, courseId, course }: WriteUserDataType) {

  let arrAllWorkouts: UserWorkoutType[] = [];

  await get(child(ref(database), "workouts"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        arrAllWorkouts = Object.entries(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const workoutsList = arrAllWorkouts.filter((workout) =>
    course.workouts.includes(workout[0])
  );

  // const workoutNames = workoutsList
  //   .map((workout) => workout[1].name).sort();

  await set(ref(database, "users/" + userId + "/courses/" + courseId), {
    _id: course._id,
    nameEN: course.nameEN,
    nameRU: course.nameRU,
    workouts: workoutsList,
    progress: 0,
  });
}
