import { CourseType } from "@/app/course/[id]/page";
import { database } from "@/app/firebase";
import { child, get, ref, set } from "firebase/database";

type WriteUserDataType = {
  userId: string | undefined;
  courseId: string;
  course: CourseType;
};
export type UserWorkoutType = [
  string,
  { name: string; video: string; _id: string; exercises: ExerciseType[] }
];
export type ExerciseType = { name: string; quantity: number };
export type WorkoutType = {
  name: string;
  video: string;
  _id: string;
  exercises: ExerciseType[];
};
type NewWorkoutContentType = {
  [key: string]: {
    _id: string;
    name: string;
    progress: string;
    video: string;
    exercises: ExerciseType[];
  };
};

export async function writeUserData({
  userId,
  courseId,
  course,
}: WriteUserDataType) {
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
  let newWorkoutslist: NewWorkoutContentType = {};
  Object.values(workoutsList).forEach((workout) => {
    const workoutNewContent = { ...workout[1], progress: "0%" };
    const newKey: string = workout[0];
    newWorkoutslist[newKey] = workoutNewContent;
  });


  await set(ref(database, `users/${userId}/courses/${courseId}`), {
    _id: course._id,
    nameEN: course.nameEN,
    nameRU: course.nameRU,
    workouts: newWorkoutslist,
    progress: "0%",
  });
}
