import React from "react";
import styles from "./styles.module.scss"

export function AddedGameFormStores (props: {setStores: React.Dispatch<React.SetStateAction<any[]>>}) {
  const {setStores} = props

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Магазин</h3>

      <ul className={styles.list}>
        <li className={styles.item}>
          <input className={styles.input} name="funpay" type="checkbox" id="funpay" />
          <label className={styles.store} htmlFor="funpay">FunPay</label>
        </li>
        <li className={styles.item}>
          <input className={styles.input} type="checkbox" name="avito" id="avito"/>
          <label className={styles.store} htmlFor="avito">Авито</label>
        </li>
        <li className={styles.item}>
        <input className={styles.input} type="checkbox" name="platimarket" id="platimarket"/>
          <label className={styles.store} htmlFor="platimarket">Plati.Market</label>
        </li>
      </ul>
    </div>
  )
}
