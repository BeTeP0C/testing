import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

export const AddedGameSteps = observer((props: { numberStep: number }) => {
  const { numberStep } = props;

  return (
    <div className={styles.container}>
      <span className={styles.amount_step}>{numberStep} / 2</span>

      <div className={styles.steps}>
        <span
          className={`${styles.step} ${styles.step_first} ${numberStep !== 0 ? styles.step_active : ""}`}
        />
        <span
          className={`${styles.step} ${styles.step_second} ${numberStep === 2 ? styles.step_active : ""}`}
        />
      </div>
    </div>
  );
});
