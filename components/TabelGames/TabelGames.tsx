import React, { useContext, useEffect } from "react";
import styles from './styles.module.scss'
import { TableListRow } from "./TableListRow";
import { MagazineStore } from "../../common/store";
import { TableLoading } from "./TableLoading/TableLodaing";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../MainPage";

export const TableGames = observer(() => {
  const magazineStore: MagazineStore = useContext(StoreContext)

  useEffect (() => {
    // let  isFlag = true
    // setTimeout(() => {

    // }, 1000)
    // if (isFlag) {

    magazineStore.getGames()
    console.log(magazineStore.isLoadingGames)
    if (magazineStore.authorizate) {

    }
  }, [])

  return (
    <div className={styles.container}>
      <ul className={styles.table}>
          <li className={styles.header}>
            <ul className={styles.listHeading}>
              <li className={styles.heading}>Дата создания</li>
              <li className={styles.heading}>Название игры</li>
              <li className={styles.heading}>App ID</li>
              <li className={styles.heading}>Обновление</li>
            </ul>
          </li>

          <li className={styles.body}>
            {magazineStore.isLoadingGames ? <TableLoading /> : <TableListRow />}
          </li>
        </ul>
    </div>
  )
})
