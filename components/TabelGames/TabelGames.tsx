import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { TableListRow } from "./TableListRow";
import { TableLoading } from "./TableLoading/TableLodaing";
import { TableMainRow } from "./TableMainRow/TableMainRow";
import { TableStore } from "../../common/stores/tableStore";
import { RootStoreContext } from "../../pages/_app";

export const TableGames = observer(() => {
  const { tableStore } = useContext(RootStoreContext);

  return (
    <div className={styles.container}>
      <ul className={styles.table}>
        <TableMainRow />

        <li className={styles.body}>
          {tableStore.isLoadingTable ? <TableLoading /> : <TableListRow />}
        </li>
      </ul>
    </div>
  );
});
