import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import styles from "./styles.module.scss";
import { TableGame } from "../TableGame";
import { GlobalStore } from "../../../common/stores/globalStore";
import { RootStoreContext } from "../../../pages/_app";

export const TableListRow = observer(() => {
  const { globalStore } = useContext(RootStoreContext);

  return (
    <ul className={styles.listRow}>
      {globalStore.products.map((el) => {
        return <TableGame key={el.id} product={el} />;
      })}
    </ul>
  );
});
