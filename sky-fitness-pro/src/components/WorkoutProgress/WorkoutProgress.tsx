type WorkoutProgressType = {
    title: string;
    progress: number | string;
    percentage?: string
}
export default function WorkoutProgress({title, progress, percentage}: WorkoutProgressType) {

  console.log(progress);
  return (
    <div>
      <p className="text-black text-[18px] font-roboto-400 font-normal mb-[10px]">
        {`${title} ${progress}%`}
      </p>
      <div className="w-auto h-[6px] bg-grayLight  rounded-full ">
        <div className="rounded-full h-[100%] bg-blueLight" style={{width: percentage}}></div>
      </div>
    </div>
  );
}
