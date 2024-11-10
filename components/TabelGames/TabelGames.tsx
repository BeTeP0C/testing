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
    magazineStore.getGames()
  }, [])

  return (
    <div className={styles.container}>
      <ul className={styles.table}>
          <li className={styles.header}>
            <ul className={styles.listHeading}>
              <li className={styles.heading}>
                <button onClick={() => magazineStore.handleSortGameForDate()} className={styles.button}>Дата создания</button>
              </li>
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
