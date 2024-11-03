import React, { useContext } from "react";
import styles from "./styles.module.scss"
import { StoreContext } from "../../MainPage";

export function EditorGameButtonSave (props: {value: number}) {
  const {value} = props
  const store = useContext(StoreContext)

  return (
    <button className={styles.button} onClick={() => store.handleSaveGame(store.isOpenGameInfo.id, value)}>Сохранить</button>
  )
}
