import React from "react";
import styles from "./styles.module.scss";

export function EditorGameInputCountry() {
  return (
    <div className={styles.container}>
      <label htmlFor="country" className={styles.title}>
        Регион
      </label>

      <select className={styles.select} name="country" id="country">
        <option value="Казахстан">Казахстан (KZ)</option>
      </select>
    </div>
  );
}
