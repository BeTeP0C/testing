import React from "react";
import styles from "./styles.module.scss"
import { AddedGameEditionCountries } from "../AddedGameEditionCountries";

type TAddedGameEditionItem = {
  title: string,
  coutries: string [],
  id: string,
  type?: string,
  funcs: {
    addPack: (id: string) => void,
    deletePack: (id: string) => void
  }
}

export function AddedGameEditionItem ({title, coutries, id, type = "choice", funcs}: TAddedGameEditionItem) {
  return (
    <li className={`${styles.edition} ${type === "select" ? styles.edition_select : ""}`}>
      <h4 className={styles.heading}>{title}</h4>
      <AddedGameEditionCountries countries={coutries}/>
      {type === "select" ? <button onClick={() =>funcs.deletePack(id)} className={styles.delete}></button> :
        type === "choice" ? <button onClick={() => funcs.addPack(id)} className={styles.select}></button> : ""}
    </li>
  )
}
