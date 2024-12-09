import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { TableStore } from "../../../common/stores/tableStore";
import { RootStoreContext } from "../../../pages/_app";

export const TableMainRow = observer(() => {
  const { tableStore } = useContext(RootStoreContext);

  return (
    <li className={styles.header}>
      <ul className={styles.listHeading}>
        <li className={styles.heading}>
          <button
            type="button"
            onClick={() => tableStore.sortProductForDate()}
            className={`${styles.button}`}
          >
            Дата создания
            <span
              className={`${styles.sort} ${tableStore.sortType === "top" ? styles.sort_top : styles.sort_bottom}`}
            />
          </button>
        </li>
        <li className={styles.heading}>Название игры</li>
        <li className={styles.heading}>App ID</li>
        <li className={styles.heading}>Обновление</li>
      </ul>
    </li>
  );
});
