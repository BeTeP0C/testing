import React from "react";
import styles from "./styles.module.scss"
import { symlink } from "fs";

export function Header(props: {titleStore: string, funpayActivate: boolean}) {
  const {titleStore, funpayActivate} = props

  return (
    <header className={styles.header}>
      <div className={styles.container}>
          <h1 className={styles.heading}>{titleStore}</h1>

          <span data-testid="status" className={`${styles.status} ${funpayActivate ? styles.status_active : ""}`}>FunPay: {funpayActivate ? "Активен" : "Не активен"}</span>
        </div>
    </header>
  )
}
