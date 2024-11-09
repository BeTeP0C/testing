import React from "react";
import styles from "./styles.module.scss"
import { UpdateSet } from "../Informations/UpdateSet";
import { ExchangeRate } from "../Informations/ExchangeRate/ExchangeRate";
import { Profit } from "../Informations/Profit";

export function MainInfo (props: {funpayActivate: boolean}) {
  const {funpayActivate} = props

  return (
    <div className={styles.main}>
      <ul className={styles.list}>
        {funpayActivate ? "" : <UpdateSet />}
        <ExchangeRate />
        {/* <Profit /> */}
      </ul>
    </div>
  )
}
