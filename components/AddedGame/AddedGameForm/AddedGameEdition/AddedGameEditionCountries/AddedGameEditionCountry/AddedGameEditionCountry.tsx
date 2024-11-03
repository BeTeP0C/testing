import React from "react";
import styles from "./styles.module.scss"
import { Russia } from "../../../../../Icons/CoutryFlags/Russia";
import { Ukraine } from "../../../../../Icons/CoutryFlags/Ukraine";
import { Belarus } from "../../../../../Icons/CoutryFlags/Belarus";
import { Kazahstan } from "../../../../../Icons/CoutryFlags/Kazahstan";

export function AddedGameEditionCountry (props: {country: string}) {
  const {country} = props

  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        {country === "RU" ? <Russia width={10} height={12}/> :
        country === "UK" ? <Ukraine width={10} height={12}/> :
        country === "KZ" ? <Kazahstan width={10} height={12}/> : ""}
      </span>

      {country}
    </li>
  )
}
