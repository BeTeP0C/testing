import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddedGameEditionList } from "../AddedGameEditionList";
import { AddStore } from "../../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../../pages/_app";
import { ErrorsStore } from "../../../../../../common/stores/errorsStore";

type TAddedGameEditionSelect = {
  addStore: AddStore;
  errorsStore: ErrorsStore;
};

export const AddedGameEditionSelect = observer(() => {
  const { addStore, errorsStore }: TAddedGameEditionSelect =
    useContext(RootStoreContext);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Издание
        {errorsStore.firstPageAddFormErrors.editionsError.active ? (
          <span className={styles.error}>
            {errorsStore.firstPageAddFormErrors.editionsError.message}
          </span>
        ) : (
          ""
        )}
      </h3>

      <div className={styles.content}>
        <AddedGameEditionList
          editions={addStore.firstPageAddForm.selectEditions}
          type="select"
          addPack={addStore.handleAddEdition}
          deletePack={addStore.handleDeleteEdition}
        />
      </div>
    </div>
  );
});
