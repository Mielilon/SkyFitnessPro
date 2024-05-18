
import Button from "@/components/Button/Button";
import CourseCard from "@/components/CourseCard/CourseCard";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import Link from "next/link";
import { firebaseConfig } from '../app/firebase'

export default function MainCoursesPage() {
  let coursesArray: any[] = [];
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  console.log("object");
  const coursesDB = ref(database, 'courses');
  onValue(coursesDB, (snapshot) => {
    if (snapshot.exists()) {
      coursesArray = Object.entries(snapshot.val());
      console.log(coursesArray);
    } else {
      alert('Извините, курсы не найдены, либо нет подключения к интернету')
      return
    }
  })

  return (
    <>
      <div id="top" className="flex flex-row lg:mb-[50px] mb-[34px] items-end space-x-7">
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

        {coursesArray.map((course) => {
          console.log(course[1].nameRU);
          return (
            <CourseCard key={course[1]._id} imgURL={course[1].nameEN} title={course[1].nameRU} />
          )
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
