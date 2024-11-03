import React from "react";
import styles from "./styles.module.scss"

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
          <h1 className={styles.heading}>Название магазина</h1>

          <span data-testid="status" className={styles.status + " " + styles.status_active}>FunPay: Активен</span>
        </div>
    </header>
  )
}
