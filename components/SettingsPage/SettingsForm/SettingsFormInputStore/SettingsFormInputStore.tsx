import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

export const SettingsFormInputStore = observer(
  (props: { titleStore: string; setTitleStore: React.Dispatch<string> }) => {
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
          placeholder="Введите название магазина"
        />
      </div>
    );
  },
);
