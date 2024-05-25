// import { getAuth } from "firebase/auth";
// import { writeUserData } from "./writeUserData";
// import { useRouter } from "next/router";



// export async function addCourse(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
//     const router = useRouter();
//   e.stopPropagation();

//   const userId = getAuth(); 

//   if (!userId.currentUser) return router.replace("/signin");

//   await writeUserData({ userId: userId.currentUser?.uid, courseId, course })
// }