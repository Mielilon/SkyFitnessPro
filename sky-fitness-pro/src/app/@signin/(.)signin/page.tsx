"use client";

import FormInput from "@/components/FormInput/FormInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import ButtonLink from "@/components/ButtonLink/ButtonLink";
import WrapperModal from "@/components/WrapperModal/WrapperModal";
import { signIn } from "@/app/api";
import { Modal } from "@/components/Modal/Modal";

export type DataUserType = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const [errorText, setError] = useState("");
  const [userData, setUserData] = useState<DataUserType>({
    email: "",
    password: "",
  });

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    if (!userData.email || !userData.password) return;

    const { error } = await signIn(userData);

    if (error) {
      return setError("Логин и пароль не совпадают, попробуйте еще раз");
    }

    return router.back();
  };

  return (
    <Modal>
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

          <FormInput
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            value={userData.password}
            type="password"
            name="password"
            placeholder="Пароль"
          />

          <p className="text-rose-500 text-center mt-1">{errorText}</p>
        </div>

        <div className="space-y-2.5">
          <Button type="submit" title="Войти" />
          <ButtonLink onClick={() => router.replace("/signup")} title="Зарегистрироваться" link="/signup" />
        </div>
      </WrapperModal>
    </Modal>
  );
}
