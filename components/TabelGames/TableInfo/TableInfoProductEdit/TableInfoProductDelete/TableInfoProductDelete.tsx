import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { GlobalStore } from "../../../../../common/stores/globalStore";
import { RootStoreContext } from "../../../../../pages/_app";
import { TableStore } from "../../../../../common/stores/tableStore";

type TTableInfoProductEditDelete = {
  editRef: React.MutableRefObject<HTMLDivElement>;
  infoRef: React.MutableRefObject<HTMLDivElement>;
};

type TTableInfoProductEditDeleteStores = {
  globalStore: GlobalStore;
  tableStore: TableStore;
};

export const TableInfoProductEditDelete = observer(
  ({ infoRef, editRef }: TTableInfoProductEditDelete) => {
    const { globalStore, tableStore }: TTableInfoProductEditDeleteStores =
      useContext(RootStoreContext);

    const handleDeleteClick = () => {
      globalStore.handleOpenDeleteForm("table");
      tableStore.setPerhapsCountryHeight((editRef.current?.offsetHeight ?? 0) + 39);
      tableStore.setPerhapsEditionHeight(infoRef.current?.offsetHeight);
    };

    return (
      <button
        type="button"
        onClick={handleDeleteClick}
        className={styles.delete}
      >
        Удалить
      </button>
    );
  },
);
