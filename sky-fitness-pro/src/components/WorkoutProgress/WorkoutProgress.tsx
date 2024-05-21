type WorkoutProgressType = {
    title: string;
    progress: number;
}
export default function WorkoutProgress({title, progress}: WorkoutProgressType) {
  return (
    <div>
      <p className="text-black text-[18px] font-roboto-400 font-normal mb-[10px]">
        {`${title} ${progress}%`}
      </p>
      <div className="w-auto h-[6px] bg-gray-light rounded-full ">
        <div className="rounded-full h-[100%] bg-blue-light" style={{width: progress}}></div>
      </div>
    </div>
  );
}
