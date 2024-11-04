import React from "react";
import styles from "./styles.module.scss"

type TSettingsFormCountriesItem = {
  title: string,
  id: number,
  type?: string,
  funcs: {
    addPack: (id: number) => void,
    deletePack: (id: number) => void
  }
}


export function SettingsFormCountriesItem ({title, id, type = "choice", funcs}: TSettingsFormCountriesItem) {
  return (
    <li className={`${styles.item} ${type === "select" ? styles.item_select : ""}`}>
      <span className={styles.title}>{title}</span>
      {type === "select" ? <button onClick={() =>funcs.deletePack(id)} className={styles.close}></button> :
        type === "choice" ? <button onClick={() => funcs.addPack(id)} className={styles.add}></button> : ""}
    </li>
  )
}
