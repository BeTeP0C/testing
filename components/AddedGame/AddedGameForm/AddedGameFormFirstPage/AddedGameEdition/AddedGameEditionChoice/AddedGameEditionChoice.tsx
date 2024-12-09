import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddedGameEditionList } from "../AddedGameEditionList";
import { AddStore } from "../../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../../pages/_app";

export const AddedGameEditionChoice = observer(() => {
  const { addStore } = useContext(RootStoreContext);

  return (
    <div className={styles.container}>
      <AddedGameEditionList
        editions={addStore.firstPageAddForm.choiceEditions}
        addPack={addStore.handleAddEdition}
        deletePack={addStore.handleDeleteEdition}
      />
    </div>
  );
});
