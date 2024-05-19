"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import WrapperModal from "@/components/WrapperModal/WrapperModal";
import FormInput from "@/components/FormInput/FormInput";
import Button from "@/components/Button/Button";

import { ChangePassword } from "../../api";
import { Modal } from "@/components/Modal/Modal";
import Link from "next/link";


export type ErrorPasswordType = {
    password: string[];
    repeatPassword: string[];
};

export type ChangePasswordType = {
    password: string;
    repeatPassword: string;
};
export default function resetPassword() {

    const [errorText, setError] = useState<ErrorPasswordType>({
        repeatPassword: [],
        password: [],
    });

    const [userData, setUserData] = useState<ChangePasswordType>({
        password: "",
        repeatPassword: "",
    });

    const router = useRouter();


    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { result, error } = await ChangePassword(userData.password);

        if (error) {
            return console.log(error)
        }

        if (result) {

        }
        return router.replace("/profile")
    }

    return (
        <Modal>
            <WrapperModal onSubmit={(event) => handleForm(event)}>
                <div className="mb-[34px]">

                    <FormInput
                        onChange={(e) =>
                            setUserData({ ...userData, password: e.target.value })
                        }
                        value={userData.password}
                        type="password"
                        name="password"
                        placeholder="Новый пароль"
                    />

                    <p className="text-red-500 mb-[4px]">
                        {errorText.password ? errorText.password[0] : ""}
                    </p>

                    <FormInput
                        onChange={(e) =>
                            setUserData({ ...userData, repeatPassword: e.target.value })
                        }
                        value={userData.repeatPassword}
                        type="password"
                        name="password"
                        placeholder="Повторите пароль"
                    />

                    <p className="text-red-500 mb-[4px]">
                        {errorText.repeatPassword ? errorText.repeatPassword[0] : ""}
                    </p>
                </div>

                <div className="space-y-2.5">
                    <Link href="/reset_password_email">
                        <button
                            className="justify-self-center font-roboto-400 rounded-full w-full h-[52px] px-5 bg-[#BCEC30] text-lg text-[#000000] hover:bg-[#C6FF00] active:bg-[#000000] active:text-[#FFFFFF]"
                        >
                            Подтвердить
                        </button>
                    </Link>
                </div>
            </WrapperModal>
        </Modal>
    );
}