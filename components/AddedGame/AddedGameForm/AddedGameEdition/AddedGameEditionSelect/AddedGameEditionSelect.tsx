import React from "react";
import styles from "./styles.module.scss"
import { AddedGameEditionList } from "../AddedGameEditionList";

type TAddedGameEditionSelect = {
  packages: {
    title: string,
    countries: string [],
    id: string
  } [],
  funcs: {
    addPack: (id: string) => void,
    deletePack: (id: string) => void
  }
}

export function AddedGameEditionSelect ({packages, funcs}: TAddedGameEditionSelect) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Издание</h3>

      <div className={styles.content}>
        <AddedGameEditionList editions={packages} type="select" funcs={funcs}/>
      </div>
    </div>
  )
}
