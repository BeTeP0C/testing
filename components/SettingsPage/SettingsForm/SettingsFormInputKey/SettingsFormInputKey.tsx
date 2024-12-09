import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { TStateData } from "../../../../types/global";

export const SettingsFormInputKey = observer(
  (props: {
    funpayKey: string;
    setFunpayKey: React.Dispatch<string>;
    activate: TStateData;
  }) => {
    const { funpayKey, setFunpayKey, activate } = props;

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFunpayKey(e.currentTarget.value);
    };

    return (
      <div className={styles.container}>
        <label htmlFor="key" className={styles.title}>
          FunPay ключ
        </label>

        <div className={styles.key}>
          <input
            onChange={(e) => changeInput(e)}
            className={styles.input}
            type="text"
            id="key"
            value={funpayKey}
            placeholder="Введите ключ"
          />
          <span
            className={`${styles.activate} ${
              activate === "alive"
                ? styles.activate_active
                : activate === "loading"
                  ? styles.activate_loading
                  : activate === "dead"
                    ? styles.activate_unactive
                    : ""
            }`}
          >
            {activate === "alive"
              ? "Активен"
              : activate === "loading"
                ? "Подключение..."
                : activate === "dead"
                  ? "Не активен"
                  : ""}
          </span>
        </div>
      </div>
    );
  },
);
