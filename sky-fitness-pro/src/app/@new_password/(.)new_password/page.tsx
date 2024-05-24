"use client"
import { Modal } from "@/components/Modal/Modal";
import SVG from "@/components/SVG/SVG";
import { useAppSelector } from "@/components/hooks/hooks";
import Link from "next/link";


export default function NewPasswordPage() {
    const userEmail = useAppSelector((store) => store.user.userDataDuble?.email);
    
    return (
        <Modal>
            <div className="mx-auto max-w-[100%]">
                <div className="mx-auto px-[calc(50%-(366px/2))]">
                    <form className="w-[337px] md:w-[366px] bg-[#FFFFFF] rounded-[30px] px-[31px] md:px-[40px] py-[40px]" action="#">
                        <Link href="/">
                            <SVG className="w-[222px] h-[35px] mb-5 mx-auto" icon="icon-form-logo" />
                        </Link>
                        <p className="text-[18px] text-black font-Roboto-400 text-center">
                            Ссылка для востановления <br /> пароля отправлена <br /> на {userEmail}</p>
                    </form>
                </div>
            </div>
        </Modal>
    );
}