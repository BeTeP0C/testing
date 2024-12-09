import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddStore } from "../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../pages/_app";

export const AddedGameFormButtonBack = observer(() => {
  const { addStore } = useContext(RootStoreContext);

  return (
    <button
      onClick={() => addStore.handleBackPage()}
      className={styles.button}
      type="button"
    >
      Назад
    </button>
  );
});
