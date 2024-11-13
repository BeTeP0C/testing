import React from "react";
import styles from "./styles.module.scss";

export function SettingsFormInputStore(props: {
  titleStore: string;
  setTitleStore: React.Dispatch<any>;
}) {
  const { titleStore, setTitleStore } = props;

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleStore(e.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="store" className={styles.title}>
        Название магазина
      </label>
      <input
        onChange={(e) => changeInput(e)}
        className={styles.input}
        type="text"
        id="store"
        value={titleStore}
      />
    </div>
  );
}
