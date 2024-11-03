import React, { useContext } from "react";
import styles from "./styles.module.scss"
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../../MainPage";

export const AddedGameFormButtonCreate  = observer((props: {
  func: (appId: number, packageId: number, title: string) => Promise<void>,
  appId: number,
  packageId: number,
  title: string}) =>
  {
    const {func, appId,packageId,title} = props
    const store = useContext(StoreContext)

    return (
      <button onClick={async () =>  store.postGame(appId,packageId,title)} className={styles.button}>Создать</button>
    )
})
