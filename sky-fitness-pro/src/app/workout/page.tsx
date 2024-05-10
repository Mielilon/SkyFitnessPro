import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Button from "@/components/Button/Button";
import Title from "@/components/Title/Title";
import VideoComponent from "@/components/Video/Video";
import WorkoutProgress from "@/components/WorkoutProgress/WorkoutProgress";
import { breadcrumbsItems, workoutProgress } from "@/lib/data";
import { Suspense } from "react";

export default function WorkoutPage() {
  return (
    <>
      <section>
        <Title label={"Йога"} />
        <Breadcrumbs
          /* Красота и здоровье / Йога на каждый день / 2 день */
          items={breadcrumbsItems}
        />
      </section>
      <section className="h-[189px] md:min-h-fit lg:h-[639px] rounded-[30px] mb-6 lg:mb-10">
        <Suspense fallback={<p>Loading video...</p>}>
          <VideoComponent />
        </Suspense>
      </section>
      <section className="rounded-[30px] p-[30px] lg:p-10 bg-white shadow-def ">
        <h2 className="text-[32px] text-black font-skyeng font-normal mb-[20px]">
          Упражнения тренировки 2
        </h2>
        <div className="grid grid-flow-row gap-6 items-end md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {workoutProgress.map((step, i) => {
            return (
              <div className="lg:w-[320px] w-[283px]" key={i}>
                <WorkoutProgress title={step.title} progress={step.process} />
              </div>
            );
          })}
        </div>
        <div className="lg:w-[320px] max-w-[283px] w-auto mt-10">
          <Button title="Заполнить свой прогресс" />
        </div>
      </section>
    </>
  );
}
