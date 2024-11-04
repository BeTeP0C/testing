import React from "react";
import styles from "./styles.module.scss"
import { SettingsFormCountriesList } from "../SettingsFormCountriesList";

type TSettingsFormCountriesSelect = {
  countries: {
    title: string,
    id: number
  } [],
  funcs: {
    addPack: (id: number) => void,
    deletePack: (id: number) => void
  }
}

export function SettingsFormCountriesSelect ({countries, funcs}: TSettingsFormCountriesSelect) {
  return (
    <div className={styles.container}>
      <SettingsFormCountriesList countries={countries} funcs={funcs} type="select"/>
    </div>
  )
}
