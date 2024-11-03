import React from "react";
import styles from "./styles.module.scss"
import { Kazahstan } from "../../Icons/CoutryFlags/Kazahstan";

export function EditorGameInputCountry () {
  return (
    <div className={styles.container}>
      <label htmlFor="country" className={styles.title}>Регион</label>

      <select className={styles.select} name="country">
        <option value="Казахстан">
          {/* <Kazahstan /> */}
          Казахстан (KZ)
        </option>
      </select>
    </div>
  )
}
