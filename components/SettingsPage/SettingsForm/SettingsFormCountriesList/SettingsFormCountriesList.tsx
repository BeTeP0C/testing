import React from "react";
import styles from "./styles.module.scss"
import { SettingsFormCountriesItem } from "../SettingsFormCountriesItem";

type TSettingsFormCountriesList = {
  title: string,
  id: number
}

type TEditionFuncs ={
  addPack: (id: number) => void,
  deletePack: (id: number) => void
}


export function SettingsFormCountriesList (props: {countries:  TSettingsFormCountriesList [], type?: string, funcs: TEditionFuncs}) {
  const {countries, type = "select", funcs} = props

  return (
    <ul className={styles.list}>
      {countries.map(el => {
        return (
          <SettingsFormCountriesItem key={el.id} title={el.title} id={el.id} type={type} funcs={funcs}/>
        )
      })}
    </ul>
  )
}
