import React, { useContext } from "react";
import styles from "./styles.module.scss"
import { MagazineStore } from "../../common/store";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../MainPage";

export const ButtonAddProduct = observer((props: {store: MagazineStore}) => {
  // const {store} = props
  const store:MagazineStore = useContext(StoreContext)

  return (
    <button onClick={() => store.handleClickAddGame()} className={styles.button}>Добавить товар</button>
  )
})
