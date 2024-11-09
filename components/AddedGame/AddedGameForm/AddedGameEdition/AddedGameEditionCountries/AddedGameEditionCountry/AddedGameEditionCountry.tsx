import React from "react";
import styles from "./styles.module.scss"
import { Russia } from "../../../../../Icons/CoutryFlags/Russia";
import { Ukraine } from "../../../../../Icons/CoutryFlags/Ukraine";
import { USA } from "../../../../../Icons/CoutryFlags/USA";
import { Belarus } from "../../../../../Icons/CoutryFlags/Belarus";
import { Kazahstan } from "../../../../../Icons/CoutryFlags/Kazahstan";

export function AddedGameEditionCountry (props: {country: string}) {
  const {country} = props

  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        {country === "ru" ? <Russia width={10} height={12}/> :
        country === "uk" ? <Ukraine width={10} height={12}/> :
        country === "kz" ? <Kazahstan width={10} height={12}/> :
        country === "by" ? <Belarus width={10} height={12}/> :
        country === "us" ? <USA width={10} height={12}/> : ""}
      </span>

      {country}
    </li>
  )
}
