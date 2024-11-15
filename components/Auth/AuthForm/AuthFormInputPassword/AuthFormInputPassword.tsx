import React from "react";
import styles from "./styles.module.scss";

type TAuthFormInputPassword = {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export function AuthFormInputPassword({ setPassword }: TAuthFormInputPassword) {
  const changeValue = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <div className={styles.content}>
      <label htmlFor="" className={styles.title}>
        Пароль
      </label>

      <input
        type="password"
        onBlur={(e) => changeValue(e)}
        placeholder="Введите пароль"
        className={styles.input}
      />
    </div>
  );
}
