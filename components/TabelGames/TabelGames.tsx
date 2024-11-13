import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { TableListRow } from "./TableListRow";
import { MagazineStore } from "../../common/store";
import { TableLoading } from "./TableLoading/TableLodaing";
import { StoreContext } from "../MainPage";

export const TableGames = observer(() => {
  const magazineStore: MagazineStore = useContext(StoreContext);
  const [sortType, setSortType] = useState("top");

  const handleSortDate = () => {
    setSortType(sortType === "top" ? "bottom" : "top");

    magazineStore.sortGameForDate(sortType);
  };

  useEffect(() => {
    magazineStore.getGames();
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.table}>
        <li className={styles.header}>
          <ul className={styles.listHeading}>
            <li className={styles.heading}>
              <button
                onClick={() => handleSortDate()}
                className={`${styles.button}`}
              >
                Дата создания
                <span
                  className={`${styles.sort} ${sortType === "top" ? styles.sort_top : styles.sort_bottom}`}
                />
              </button>
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
  );
});
