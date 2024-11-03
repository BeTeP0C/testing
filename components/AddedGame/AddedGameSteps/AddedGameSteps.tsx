import React from "react";
import styles from "./styles.module.scss"

export function AddedGameSteps (props: {isNext: boolean}) {
  const {isNext} = props

  return (
    <div className={styles.container}>
      <span className={styles.amount_step}>{isNext ? 2 : 1} / 2</span>

      <div className={styles.steps}>
        <span className={`${styles.step} ${styles.step_first} ${styles.step_active}`}></span>
        <span className={`${styles.step} ${styles.step_second} ${isNext ? styles.step_active : ""}`}></span>
      </div>
    </div>
  )
}
