import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AuthForm } from "./AuthForm";
import { AuthFormInputLogin } from "./AuthForm/AuthFormInputLogin";
import { AuthFormInputPassword } from "./AuthForm/AuthFormInputPassword";
import { AuthFormButton } from "./AuthForm/AuthFormButton";

export const Auth = observer(() => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Авторизация</h1>

      <AuthForm login={login} password={password}>
        <AuthFormInputLogin setLogin={setLogin} />
        <AuthFormInputPassword setPassword={setPassword} />
        <AuthFormButton />
      </AuthForm>
    </div>
  );
});
