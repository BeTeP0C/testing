import React from "react";
import styles from "./styles.module.scss"
import { AddedGameEditionList } from "../AddedGameEditionList";

type TAddedGameEditionChoice = {
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

export function AddedGameEditionChoice ({packages, funcs}: TAddedGameEditionChoice) {

  return (
    <div className={styles.container}>
      <AddedGameEditionList editions={packages} funcs={funcs}/>
    </div>
  )
}
