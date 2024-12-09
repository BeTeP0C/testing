import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import mainStyles from "../informations.module.scss";

export const ExchangeRate = observer(() => {
  return (
    <li className={`${mainStyles.info} ${styles.info}`}>
      <div className={styles.content}>
        <table className={styles.table}>
          <thead className={styles.header}>
            <tr>
              <th className={styles.heading}>Валюта</th>
              <th className={styles.heading}>Курс ЦБ</th>
              <th className={styles.heading}>Изменение</th>
            </tr>
          </thead>
        </table>
      </div>

      <div className={styles.update}>
        <h3 className={styles.update_heading}>В разработке...</h3>
      </div>

      <span className={styles.bg} />
    </li>
  );
});
