import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddStore } from "../../common/stores/addStore";
import { RootStoreContext } from "../../pages/_app";

export const ButtonAddProduct = observer(() => {
  const { addStore } = useContext(RootStoreContext);

  return (
    <button
      type="button"
      onClick={() => addStore.handleOpenAddForm()}
      className={styles.button}
    >
      Добавить товар
    </button>
  );
});
