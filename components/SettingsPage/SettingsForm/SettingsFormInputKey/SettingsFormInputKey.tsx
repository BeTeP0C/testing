import React from "react";
import styles from "./styles.module.scss"

export function SettingsFormInputKey () {
  return (
    <div className={styles.container}>
      <label htmlFor="key" className={styles.title}>Название магазина</label>
      <div className={styles.ke}>
        <input className={styles.input} type="text" id="key"/>
        <span className={styles.activate}>Активен</span>
      </div>
    </div>
  )
}
