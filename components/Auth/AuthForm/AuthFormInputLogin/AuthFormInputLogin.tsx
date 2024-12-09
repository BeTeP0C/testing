import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

type TAuthFormInputLogin = {
  setLogin: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthFormInputLogin = observer(
  ({ setLogin }: TAuthFormInputLogin) => {
    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLogin(e.currentTarget.value);
    };

    return (
      <div className={styles.content}>
        <label htmlFor="login" className={styles.title}>
          Логин
        </label>

        <input
          type="text"
          id="login"
          onChange={changeValue}
          className={styles.input}
          placeholder="Введите логин"
        />
      </div>
    );
  },
);
