"use client";

import WrapperModal from "@/components/WrapperModal/WrapperModal";
import FormInput from "@/components/FormInput/FormInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import ButtonLink from "@/components/ButtonLink/ButtonLink";
import { signIn } from "../api";

export type ErrorType = {
  detail: string;
  email: string[];
  password: string[];
};

export type DataUserType = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<DataUserType>({
    email: "",
    password: "",
  });

  const [errorText, setError] = useState<ErrorType>({
    email: [],
    detail: "",
    password: [],
  });

  // function handelLoginBtnClick() {
  //   setError({ detail: "", email: [], password: [] });
  //   signIn({ email: userData.email, password: userData.password })
  //     .then((resUserData) => {
  //       dispatch(setLoginData(resUserData));
  //     })
  //     .then(() =>
  //       getTokens({ email: userData.email, password: userData.password })
  //     )
  //     .then(() => {
  //       router.replace("/");
  //     })
  //     .catch((error) => {
  //       setError(JSON.parse(error.message));
  //     });
  // }
  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { result, error } = await signIn(userData.email, userData.password);

    if (error) {
        return console.log(error)
    }
    // else successful
    if(result) {
    console.log(result.user.uid)
    }
    return router.replace("/")
}
  return (
    <>
      <WrapperModal onSubmit={(event) => handleForm(event)}>
        <div className="mb-[34px]">
          <FormInput
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
            type="text"
            name="login"
            placeholder="Логин"
          />

          {/* протестить вариант отображения ошибки с одним условием, смотря, что будет приходить */}
          <p className="text-red-500 mb-[4px]">
            {errorText.email ? errorText.email[0] : ""}
          </p>
          <p className="text-red-500 mb-[4px]">
            {errorText.detail ? errorText.detail : ""}
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
        </div>

        <div className="space-y-2.5">
          <Button
          type="submit" 
          title="Войти" />
          <ButtonLink title="Зарегистрироваться" link="/signup" />
        </div>
      </WrapperModal>
    </>
  );
}
