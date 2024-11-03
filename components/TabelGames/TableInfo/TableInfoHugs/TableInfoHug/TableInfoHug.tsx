import React from "react";
import styles from "./styles.module.scss"
import { Ukraine } from "../../../../Icons/CoutryFlags/Ukraine";
import { Belarus } from "../../../../Icons/CoutryFlags/Belarus";
import { Russia } from "../../../../Icons/CoutryFlags/Russia";
import { Kazahstan } from "../../../../Icons/CoutryFlags/Kazahstan";
import { TGameInfoHug } from "../../../../../types/tgames";

export function TableInfoHug (props: {hug: TGameInfoHug}) {
  const {hug} = props

  return (
    <li className={styles.row}>
      <ul className={styles.cells}>
        <li className={styles.cell + " " + styles.centering}>
          {hug.currency === "RU" ?
          <Russia /> : hug.currency === "BY" ?
          <Belarus /> : hug.currency === "UA" ?
          <Ukraine /> : hug.currency === "KZ" ?
          <Kazahstan /> : ""}

          {hug.currency}
        </li>
        <li className={styles.cell}>{hug.title}</li>
        <li className={styles.cell}>{hug.price}</li>
      </ul>
    </li>
  )
}
