"use client";

import FormInput from "@/components/FormInput/FormInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import ButtonLink from "@/components/ButtonLink/ButtonLink";
import WrapperModal from "@/components/WrapperModal/WrapperModal";
import { signIn, signUp } from "@/app/api";
import { Modal } from "@/components/Modal/Modal";

export type ErrorType = {
  email: string[];
  password: string[];
  repeatPassword: string[];
};

export type RegistrationUserType = {
  email: string;
  password: string;
  repeatPassword: string;
};

export default function SignInPage() {
  const router = useRouter();
  const [errorText, setError] = useState<ErrorType>({
    repeatPassword: [],
    email: [],
    password: [],
  });

  const [userData, setUserData] = useState<RegistrationUserType>({
    email: "",
    password: "",
    repeatPassword: "",
  });


  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { result, error } = await signUp(userData.email, userData.password);

    if (error) {
        return console.log(error)
    }
    // else successful
    if(result) {
    console.log(result.user.uid)
    }
    return router.replace("/profile")
}

  return (
    <Modal>
      <WrapperModal onSubmit={(event) => handleForm(event)}>
      <div className="mb-[34px]">
        <FormInput
          type="text"
          name="login"
          placeholder="Эл. почта"
          value={userData.email}
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
        />

        <p className="text-red-500 mb-[4px]">
          {errorText.email ? errorText.email[0] : ""}
        </p>

        <FormInput
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          value={userData.password}
          type="password"
          name="password"
          placeholder="Пароль"
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
        <Button
          type="submit"
          title="Зарегистрироваться"
          onClick={() => router.back()}
        />
        <ButtonLink onClick={() => router.back()} title="Войти" link="/signin" />
      </div>

      </WrapperModal>
    </Modal>
  );
}
