import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss"
import { SettingsForm } from "./SettingsForm";
import { SettingsFormInputStore } from "./SettingsForm/SettingsFormInputStore";
import { SettingsFormInputKey } from "./SettingsForm/SettingsFormInputKey";
import { SettingsFormInputCountries } from "./SettingsForm/SettingsFormInputCountries";
import { SettingsFormButton } from "./SettingsForm/SettingsFormButton";
import { settingsCountries } from "../../common/settingsCountries";
import { observer } from "mobx-react-lite";
import { MagazineStore } from "../../common/store";
import { createContext } from "vm";
import { StoreContext } from "../MainPage";

// const magazineStore = new MagazineStore()
// export const StoreContext = createContext(null)

export const SettingsPage = observer(() => {
  const store = useContext(StoreContext)
  const [countriesSelect, setCountriesSelect] = useState(store.settingsData.countries)
  const [countriesChoice, setCountriesChoice] = useState(store.settingsCountriesChoice)
  const [titleStore, setTitleStore] = useState(store.settingsData.titleStore)
  const [funpayKey, setFunpayKey] = useState(store.settingsData.funpayKey)

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
        <SettingsFormInputStore titleStore={titleStore} setTitleStore={setTitleStore}/>
        <SettingsFormInputKey funpayKey={funpayKey} setFunpayKey={setFunpayKey} activate={store.settingsData.funpayActivate}/>
        <SettingsFormInputCountries countriesChoice={countriesChoice} countriesSelect={countriesSelect} funcs={{addPack, deletePack}}/>
        <SettingsFormButton titleStore={titleStore} funpayKey={funpayKey} countriesSelect={countriesSelect}/>
      </SettingsForm>
    </div>
  )
})
