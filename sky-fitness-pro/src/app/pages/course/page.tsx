import Image from "next/image";
import Button from "@/components/Button/Button";
import { aboutCourse, coursePractice, workoutDescription } from "@/lib/data";

export default function CoursePage() {
  return (
    <>
      <section className="relative w-auto h-[389px] lg:h-[310px] rounded-[30px] bg-yellow overflow-hidden">
        <h1 className="font-roboto-500 hidden 2xl:text-2xl md:text-6xl md:block font-medium text-white mb-[10px] pt-[40px] pl-[40px]" >Йога</h1>
        <Image
          className="absolute top-[45px] right-[10px] lg:right-[1px] md:right-[10px] lg:top-[-80px] md:top-[10px]
          lg:w-[410px] lg:h-[400px]"
          src="/img/yoga.png"
          alt="yoga"
          width={360}
          height={350}
        />
      </section>
      <section className="my-[40px] lg:my-[60px] ">
        <h2 className="font-roboto-500 text-black text-2xl md:text-5xl mb-[24px] lg:mb-[40px]">Подойдет для вас, если:</h2>
        <div className="flex flex-col md:flex-row gap-[17px]">
          {aboutCourse.map((el, id) => {
            return (
              <div key={id} className="p-[20px] w-fit h-[141] bg-black rounded-[30px] flex flex-row gap-[15px] md:gap-[25px] items-center">
                <p className="text-lime font-roboto-500 text-7xl">{el.id}</p>
                <p className="text-lg lg:text-2xl text-white">{el.text}</p>
              </div>
            )
          })}
        </div>
      </section>
      <section className="z-10">
        <h2 className="font-roboto-500 text-black text-2xl md:text-5xl mb-[24px] lg:mb-[40px]">Направления:</h2>
        <div className="p-[30px] flex flex-col gap-y-[20px] md:grid md:grid-cols-2 md:gap-y-[22px] lg:grid-cols-3 w-auto h-[336px] md:h-[195px] lg:h-[146px] rounded-[30px] bg-lime">
          {coursePractice.map((el) => {
            return (<>
              <ul className="">
                <li className="before:content-['\2726'] font-roboto-500 text-lg md:text-2xl text-black" key={el}><span className="relative left-8" >{el}</span></li>
              </ul>
            </>)
          })}
        </div>
      </section>
      <section className="z-10 mt-[156px] lg:mt-[102px]">
        <div className="rounded-[30px] p-[40px] md:p-[30px] lg:p-10 bg-white shadow-def">
          <div className="max-w-[465px] flex flex-col ">
            <h2 className="text-[32px] md:text-5xl text-black font-roboto-500 leading-none mb-[28px]">
              Начните путь <br /> к новому телу
            </h2>
            <div className="mb-[28px] h-[178px]">
              {workoutDescription.map((el) => {
                return (<>
                  <ul className="flex flex-col list-inside">
                    <li className="list-disc space-y-3 font-roboto-400 text-lg md:text-2xl text-[#585959] leading-none md:pl-6" key={el}>{el}</li>
                  </ul>
                </>)
              })}
            </div>
            <Button title="Добавить курс" />
          </div>
          <div className="relative md:z-10 -z-10 md:bottom-[550px] bottom-[650px] md:left-[0px] left-[60px] flex justify-end">
              <Image
                className="[clip:rect(auto,auto,390px,auto)] absolute -right-[30px] top-[200px]"
                src="/img/greenLine.svg"
                alt="green line"
                width={670}
                height={390}
              />
              <Image
                className="absolute"
                src="/img/Runner.svg"
                alt="runner"
                width={519}
                height={539}
              />
          </div>
        </div>
      </section>
    </>
  );
}