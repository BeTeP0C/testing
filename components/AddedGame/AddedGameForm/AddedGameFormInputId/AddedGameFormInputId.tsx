import React, { useContext, useRef } from "react";
import styles from "./styles.module.scss"
import img from "../../../../public/assassin's_creed_valhala.png"
import { observer } from "mobx-react-lite";
import { MagazineStore } from "../../../../common/store";
import { TGameError } from "../../../../types/tgames";
import { StoreContext } from "../../../MainPage";
import { Span } from "next/dist/trace";

type TAddedGameInputId = {
  setAppId: React.Dispatch<any>,
  title: string,
  idError: TGameError
}

export const AddedGameInputId = observer(({setAppId, title, idError}: TAddedGameInputId) => {
  const inputRef = useRef(null)
  const store: MagazineStore = useContext(StoreContext)

  const changeAppId = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (store.isConnectSteam) {
      const value = e.currentTarget.value
      clearTimeout(inputRef.current)

      inputRef.current = setTimeout(() => {
        setAppId(value)
      }, 500)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <label className={styles.title} htmlFor="id">
          App ID
          {idError.activate ? <span className={styles.error}>{idError.errorMessage}</span> : ""}
        </label>
        <input onChange={(e) => changeAppId(e)} className={styles.input} type="number" name="id"/>
      </div>

      <div className={styles.right}>
        {store.isConnectSteam ?
          store.settingsData.countries.length === 0 ?
          <span>Добавьте в настройках страны</span> :
            store.isLoadingGame ?
            <span>Ищем игру...</span> :
              store.isSearchGame ?
              <>
                {title ? <img className={styles.img} src={img.src} alt="" /> : ""}
                <h3 className={styles.heading}>{title}</h3>
              </> : <span>Игра не найдена</span>
              : <span>Подключение к Steam...</span>}
      </div>
    </div>
  )
})
