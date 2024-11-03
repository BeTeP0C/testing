import React from "react";
import styles from "./styles.module.scss"

export function AddedGameFormMarkup (props: {setMarkup: React.Dispatch<any>}) {
  const {setMarkup} = props

  return (
    <div className={styles.container}>
      <label className={styles.title} htmlFor="markup">Наценка</label>
      <input className={styles.input} type="number" name="markup" placeholder="Введите целое число процентов"/>
    </div>
  )
}
