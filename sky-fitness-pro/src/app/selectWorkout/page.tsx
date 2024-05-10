import Button from "@/components/Button/Button";
import InputCheckbox from "@/components/InputCheckbox/InputCheckbox";
import { workouts } from "@/lib/data";





export default function SelectWorkout() {
    const listItems = workouts.map((workout) =>
        <li className="sm:h-[74px] h-[68px]"><div className="flex">
            <InputCheckbox />
            <div>
                <p className="font-roboto-400 sm:text-[24px] text-[18px]">{workout.description}</p>
                <p className="font-roboto-400 sm:text-[16px] text-[14px]">{workout.name} / {workout.day} день</p>
            </div>
        </div>
            <hr className="mt-[6px] ml-[10px] sm:w-[354px] w-[257px] text-[#C4C4C4]" />
        </li>
    );
    return (
        <>
            <div className="bg-[#FFFFFF]
                    rounded-[30px] 
                    sm:w-[460px] w-[343px]
                    sm:h-[609px] h-[585px]">
                <p className="sm:ml-[0px] ml-[31px]
                sm:mt-[35px] mt-[24px] font-StratosSkyeng-400 text-[32px] sm:text-center text-left">Выберите тренеровку</p>
                <div className="sm:mt-[37px] mt-[17px] sm:ml-[28px] ml-[22px]
                flex flex-col gap-[20px]">
                    <div className="sm:w-[392px] w-[343px]
                    sm:h-[380px] h-[354px]">
                        <ul className="h-[350px] overflow-auto">{listItems}</ul>
                    </div>
                    <div className="sm:w-[390px] w-[283px]">
                        <Button title="Начать" />
                    </div>
                </div>
            </div>
        </>
    )
}