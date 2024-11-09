import React from "react";
import styles from "./styles.module.scss"
import { SettingsFormCountriesList } from "../SettingsFormCountriesList";

type TSettingsFormCountriesChoice = {
  countries: {
    title: string,
    usename: string,
    code: string,
    id: number
  } [],
  funcs: {
    addPack: (id: number) => void,
    deletePack: (id: number) => void
  }
}

export function SettingsFormCountriesChoice ({countries, funcs}: TSettingsFormCountriesChoice) {
  return (
    <div className={styles.container}>
      <SettingsFormCountriesList countries={countries} funcs={funcs} type="choice"/>
    </div>
  )
}
