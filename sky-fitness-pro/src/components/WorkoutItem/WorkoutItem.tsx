import React from "react"

type WorkoutItemType = {
  id: string,
  workoutName: string,
  setSelected: React.Dispatch<React.SetStateAction<string>>,
}

export default function WorkoutItem({ id, workoutName, setSelected }: WorkoutItemType) {

  return (
    <li className="lg:h-[74px] h-[64px]">
      <div className="flex">
        <input type="radio" name="selectWorkout" id={`workout${id}`} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelected(e.target.value)} value={id} />
        <label htmlFor={`workout${id}`} className="font-roboto-400 lg:text-[24px] text-[18px]">
          {workoutName}
        </label>
      </div>
      <hr className="mt-[8px] ml-[10px] lg:w-[354px] w-[257px] text-[#C4C4C4]" />
    </li>
  )
}