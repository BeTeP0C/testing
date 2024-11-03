import React, { useContext } from "react";
import styles from "./styles.module.scss"
import { StoreContext } from "../../MainPage";

// type TEditorGameButtonDelete = {
//   id: number | null,
//   handlerDelete: (gameId: number) => void
// }

export function EditorGameButtonDelete () {
  const store = useContext(StoreContext)
  return (
    <button className={styles.button} onClick={(() => store.handleDeleteGame(store.isOpenGameInfo.id))}>Удалить</button>
  )
}
