import Image from "next/image";
import Button from "@/components/Button/Button";
import ButtonLink from "@/components/ButtonLink/ButtonLink";
import CourseCard from "@/components/CourseCard/CourseCard";
import Link from "next/link";

export default function CoursePage() {
  return (
    <>
      <div className="box-border bg-[#FAFAFA]">
        <div className="sm:mt-[0px] mt-[36px] sm:mb-[31px] mb-[19px] sm:text-[40px] text-[24px] font-bold">Профиль</div>
        <div
          className="bg-[#FFFFFF]
                    rounded-[30px] 
                    sm:w-[1160px] w-[343px]
                    sm:h-[257px] h-[453px]
                    sm:px-[30px] px-[10px]
                    py-[30px]">
          <div className="flex flex-wrap flex-row sm:space-x-[33px]">
            <div className="relative 
                        sm:w-[197px] w-[141px] 
                        sm:h-[197px] h-[141px]
                        sm:mx-[0px] mx-[90px]">
              <Image
                fill
                src="/img/no_foto.png"
                alt="no foto"
              />
            </div>
            <div className="flex flex-col 
                        sm:gap-[20px] gap-[13px]
                        sm:mt-0 mt-[22px]
                        sm:ml-0 ml-[19px]">
              <div className="sm:text-[32px] text-[24px] font-bold">
                Сергей
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="sm:text-[18px] text-[16px]">Логин: sergey.petrov96</p>
                <p className="sm:text-[18px] text-[16px]">Пароль: 4fkhdj880d</p>
              </div>
              <div className="flex flex-wrap flex-row sm:space-x-[10px] space-x-0 sm:gap-0 gap-[15px]">
                <div className="sm:w-[192px] w-[283px]">
                  <Link href="/reset_password">
                    <button
                      className="justify-self-center font-roboto-400 rounded-full w-full h-[52px] px-5 bg-[#BCEC30] text-lg text-[#000000] hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]"
                    >
                      Изменить пароль
                    </button>
                  </Link>
                </div>
                <div className="sm:w-[192px] w-[283px]">
                  <ButtonLink title="Выйти" link="/" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:mt-[53px] mt-[23px] sm:mb-[31px] mb-[12px] sm:text-[40px] text-[24px] font-bold">Мои курсы</div>
        <div className="flex flex-wrap flex-row gap-[41px]">

        </div>
      </div>
    </>
  )
}