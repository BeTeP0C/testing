import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss"
import { SettingsForm } from "./SettingsForm";
import { SettingsFormInputStore } from "./SettingsForm/SettingsFormInputStore";
import { SettingsFormInputKey } from "./SettingsForm/SettingsFormInputKey";
import { SettingsFormInputCountries } from "./SettingsForm/SettingsFormInputCountries";
import { settingsCountries } from "../../common/settingsCountries";
import { observer } from "mobx-react-lite";
import { MagazineStore } from "../../common/store";
import { createContext } from "vm";

// const magazineStore = new MagazineStore()
// export const StoreContext = createContext(null)

export const SettingsPage = observer(() => {
  const [countriesSelect, setCountriesSelect] = useState([])
  const [countriesChoice, setCountriesChoice] = useState(settingsCountries)
  // const [magazineStore, setMagazineStore] = useState(new MagazineStore())
  // useEffect(() => {
  //   let mounted: boolean = true;
  //   magazineStore.postAuth()
  //   if (mounted) {

  //   }

  //   return () => {mounted = false}
  // }, [magazineStore.authorizate])
  // useEffect (() => {

  // }, [magazineStore.authorizate])

  const addPack = (id: number) => {
    setCountriesSelect([ ...countriesSelect, countriesChoice.find(el => el.id === id)])
    setCountriesChoice(countriesChoice.filter(el => el.id !== id))
  }

  const deletePack = (id: number) => {
    setCountriesChoice([...countriesChoice, countriesSelect.find(el => el.id === id)])
    setCountriesSelect(countriesSelect.filter(el => el.id !== id))
  }

  return (
    <div className={styles.container}>
      <SettingsForm>
        <SettingsFormInputStore />
        <SettingsFormInputKey />
        <SettingsFormInputCountries countriesChoice={countriesChoice} countriesSelect={countriesSelect} funcs={{addPack, deletePack}}/>
      </SettingsForm>
    </div>
  )
})
