import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import mainStyles from "../informations.module.scss";

export const Profit = observer(() => {
  return (
    <li className={`${mainStyles.info} ${styles.info}`}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Общая прибыль</h2>

        <span className={styles.profit}>1 024 340 ₽</span>
      </div>

      <span className={styles.bg} />
    </li>
  );
});
