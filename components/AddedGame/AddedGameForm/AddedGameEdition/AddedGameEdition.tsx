import React from "react";
import styles from "./styles.module.scss"
import { AddedGameEditionSelect } from "./AddedGameEditionSelect";
import { AddedGameEditionChoice } from "./AddedGameEditionChoice";

type TAddedGameEdition = {
  packagesChoice: {
    title: string,
    countries: string [],
    id: string
  } [],
  packagesSelect: {
    title: string,
    countries: string [],
    id: string
  } [],
  funcs: {
    addPack: (id: string) => void,
    deletePack: (id: string) => void
  }
}

export function AddedGameEdition ({packagesChoice, packagesSelect, funcs}: TAddedGameEdition) {
  return (
    <div className={styles.container}>
      <AddedGameEditionSelect packages={packagesSelect} funcs={funcs}/>
      <AddedGameEditionChoice packages={packagesChoice} funcs={funcs}/>
    </div>
  )
}
