import React from "react";
import styles from "./styles.module.scss"

export function AddedGameFormPrices () {
  return (
    <div className={styles.container}>
      <div className={styles.not_markup}>
        <h3 className={styles.title}>Стоимость без наценки</h3>
        <span className={styles.price}>968 руб.</span>
      </div>
      <div className={styles.with_markup}>
        <h3 className={styles.title}>Стоимость с наценкой</h3>
        <span className={styles.price}>1204 рую.</span>
      </div>
    </div>
  )
}
