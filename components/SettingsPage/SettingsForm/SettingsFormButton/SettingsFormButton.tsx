import React, { useContext } from "react";
import styles from "./styles.module.scss"
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../../MainPage";

type TSettingsFormButton = {
  titleStore: string,
  funpayKey: string,
  countriesSelect: string[],
}

export const SettingsFormButton = observer((props: TSettingsFormButton) => {
  const store = useContext(StoreContext)
  const {titleStore, funpayKey, countriesSelect} = props

  return (
    <button onClick={() => store.handleSaveSettings(titleStore, funpayKey, countriesSelect)} className={styles.button}>Сохранить</button>
  )
})
