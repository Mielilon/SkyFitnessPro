import Button from "@/components/Button/Button";
import InputCheckbox from "@/components/InputCheckbox/InputCheckbox";
import { workouts } from "@/lib/data";

export default function SelectWorkout() {
    const listItems = workouts.map((workout) =>
        <>
            <li className="lg:h-[74px] h-[64px]"><div className="flex">
                <InputCheckbox />
                <div>
                    <p className="font-roboto-400 lg:text-[24px] text-[18px]">{workout.description}</p>
                    <p className="font-roboto-400 lg:text-[16px] text-[14px]">{workout.name} / {workout.day} день</p>
                </div>
            </div>
                <hr className="mt-[8px] ml-[10px] lg:w-[354px] w-[257px] text-[#C4C4C4]" />
            </li>
        </>
    );
    return (
        <>
            <div className="bg-[#FFFFFF]
                    rounded-[30px] 
                    lg:w-[460px] w-[343px]
                    lg:h-[609px] h-[585px]">
                <p className="lg:ml-[0px] ml-[31px]
                lg:mt-[35px] mt-[24px] 
                font-StratosSkyeng-400 text-[32px] leading-[36px] lg:text-center text-left">Выберите тренировку</p>
                <div className="lg:mt-[37px] mt-[34px] lg:ml-[28px] ml-[21px]
                flex flex-col gap-[20px]">
                    <div className="lg:w-[392px] w-[292px]
                    lg:h-[380px] h-[354px]">
                        <ul className="h-[350px] overflow-auto">{listItems}</ul>
                    </div>
                    <div className="lg:w-[390px] w-[283px]">
                        <Button title="Начать" />
                    </div>
                </div>
            </div>
        </>
    )
}