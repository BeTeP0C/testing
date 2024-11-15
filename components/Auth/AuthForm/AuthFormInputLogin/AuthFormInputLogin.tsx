import React from "react";
import styles from "./styles.module.scss";

type TAuthFormInputLogin = {
  setLogin: React.Dispatch<React.SetStateAction<string>>;
};

export function AuthFormInputLogin({ setLogin }: TAuthFormInputLogin) {
  const changeValue = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setLogin(e.currentTarget.value);
  };

  return (
    <div className={styles.content}>
      <label htmlFor="" className={styles.title}>
        Логин
      </label>

      <input
        type="text"
        onBlur={(e) => changeValue(e)}
        className={styles.input}
        placeholder="Введите логин"
      />
    </div>
  );
}
