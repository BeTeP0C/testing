import React from "react";
import styles from "./styles.module.scss"

export function SettingsFormInputStore () {
  return (
    <div className={styles.container}>
      <label htmlFor="store" className={styles.title}>Название магазина</label>
      <input className={styles.input} type="text" id="store"/>
    </div>
  )
}
