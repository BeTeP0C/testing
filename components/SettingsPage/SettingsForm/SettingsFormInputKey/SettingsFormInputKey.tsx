import React from "react";
import styles from "./styles.module.scss";

export function SettingsFormInputKey(props: {
  funpayKey: string;
  setFunpayKey: React.Dispatch<any>;
  activate: boolean;
}) {
  const { funpayKey, setFunpayKey, activate } = props;

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFunpayKey(e.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="key" className={styles.title} />
      <div className={styles.key}>
        <input
          onChange={(e) => changeInput(e)}
          className={styles.input}
          type="text"
          id="key"
          value={funpayKey}
        />
        <span
          className={`${styles.activate} ${activate ? styles.activate_active : ""}`}
        >
          {activate ? "Активен" : "Не активен"}
        </span>
      </div>
    </div>
  );
}
