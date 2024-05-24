"use client";

import WrapperModal from "@/components/WrapperModal/WrapperModal";
import FormInput from "@/components/FormInput/FormInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import ButtonLink from "@/components/ButtonLink/ButtonLink";
import { signIn } from "../api";
import ModalNewPassword from "@/components/ModalNewPassword/ModalNewPasword";
import { error } from "console";
import { useAppDispatch } from "@/components/hooks/hooks";
import { setUserDataDuble } from "@/components/store/features/userSlice";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export type DataUserType = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [errorText, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [userData, setUserData] = useState<DataUserType>({
    email: "",
    password: "",
  });

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    if (!userData.email || !userData.password) return;

    const { error } = await signIn(userData);

    if (error) {
      return setError(true);
    }

    return router.replace("/");
  };

  function toSendPasswordResetEmail(userData: DataUserType) {
    if (userData.email) {
      dispatch(setUserDataDuble(userData));
      //const userEmail = useAppSelector((store) => store.user.userDataDuble?.email);
      //console.log("Данные в форме:" + userEmail);
      const auth = getAuth();
      sendPasswordResetEmail(auth, userData.email)
        .then(() => {
          console.log("проверка");
          router.replace("/new_password")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } return
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

          <FormInput
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            value={userData.password}
            type="password"
            name="password"
            placeholder="Пароль"
          />

          {errorText && <p className="text-rose-500 text-center mt-1">Логин и пароль не совпадают.
            <span className="underline"
              onClick={() => toSendPasswordResetEmail(userData)}
            >Восстановить пароль?</span></p>}
          
        </div>

        <div className="space-y-2.5">
          <Button type="submit" title="Войти" />
          <ButtonLink title="Зарегистрироваться" link="/signup" />
        </div>
      </WrapperModal>
    </>
  );
}
