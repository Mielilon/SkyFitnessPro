"use client";
import Button from "@/components/Button/Button";
import { Modal } from "@/components/Modal/Modal";
import FieldProgressForm from "@/components/ProgressForm/FieldProgressForm";
import { labels } from "@/lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Progress() {
  const router = useRouter();
  return (
    <form
      className="fixed top-[calc(50%-(487px/2))] left-[calc(50%-(343px/2))] lg:top-[calc(50%-(596px/2))] lg:left-[calc(50%-(426px/2))]
     bg-white rounded-[30px] shadow-def w-[343px] p-[30px] lg:w-[426px] lg:p-10 "
    >
      <h3 className="font-skyeng text-[32px] text-black mb-12">Мой прогресс</h3>
      <fieldset className="w-[237px] lg:w-[320px] max-h-[350px]  mb-[34px] overflow-y-scroll">
        {labels.map((label, i) => {
          return <FieldProgressForm label={label} key={i} />;
        })}
      </fieldset>
      <Link href="success">
        <Button title="Сохранить" />
      </Link>
    </form>
  );
}
