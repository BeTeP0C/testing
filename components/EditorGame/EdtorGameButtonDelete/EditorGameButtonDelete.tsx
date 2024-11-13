import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { StoreContext } from "../../MainPage";

export function EditorGameButtonDelete() {
  const store = useContext(StoreContext);
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => store.handleDeleteGame(store.isOpenGameInfo.id)}
    >
      Удалить
    </button>
  );
}
