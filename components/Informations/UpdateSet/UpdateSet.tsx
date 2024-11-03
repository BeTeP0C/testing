import React from "react";
import styles from "./styles.module.scss"
import main_styles from "../informations.module.scss"

export function UpdateSet () {
  return (
    <li className={main_styles.info + " " + styles.info}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Обновите настройки</h2>

        <ul className={styles.list}>
          <li className={styles.item}>- Введите ключ для FunPay;</li>
          <li className={styles.item}>- Введите список стран с которыми вы работаете;</li>
        </ul>
      </div>

      <span className={styles.bg}></span>
    </li>
  )
}
