import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../AuthPage";
import styles from "./styles.module.scss";
import { AuthForm } from "./AuthForm";
import { AuthFormInputLogin } from "./AuthForm/AuthFormInputLogin";
import { AuthFormInputPassword } from "./AuthForm/AuthFormInputPassword";
import { AuthFormButton } from "./AuthForm/AuthFormButton";
import { MagazineStore } from "../../common/store";

export const Auth = observer(() => {
  const store: MagazineStore = useContext(StoreContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   console.log(store.TOKEN)
  // }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Авторизация</h1>

      <AuthForm>
        <AuthFormInputLogin setLogin={setLogin} />
        <AuthFormInputPassword setPassword={setPassword} />
        <AuthFormButton login={login} password={password} />
      </AuthForm>
    </div>
  );
});
