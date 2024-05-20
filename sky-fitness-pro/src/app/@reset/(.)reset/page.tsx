"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import WrapperModal from "@/components/WrapperModal/WrapperModal";
import FormInput from "@/components/FormInput/FormInput";
import { ChangePassword } from "../../api";
import { Modal } from "@/components/Modal/Modal";
import ButtonLink from "@/components/ButtonLink/ButtonLink";


export type ErrorPasswordType = {
    password: string[];
    repeatPassword: string[];
};

export type ChangePasswordType = {
    password: string;
    repeatPassword: string;
};
export default function ResetPage() {

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
                    <ButtonLink title='Подтвердить' link="/new_password" />
                </div>
            </WrapperModal>
        </Modal>
    );
}