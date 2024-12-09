import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

type TAuthFormInputPassword = {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthFormInputPassword = observer(
  ({ setPassword }: TAuthFormInputPassword) => {
    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
    };

    return (
      <div className={styles.content}>
        <label htmlFor="password" className={styles.title}>
          Пароль
        </label>

        <input
          type="password"
          id="password"
          onChange={changeValue}
          placeholder="Введите пароль"
          className={styles.input}
        />
      </div>
    );
  },
);
