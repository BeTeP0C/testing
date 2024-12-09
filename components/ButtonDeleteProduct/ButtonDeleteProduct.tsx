import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { GlobalStore } from "../../common/stores/globalStore";
import { RootStoreContext } from "../../pages/_app";

export const ButtonDeleteProduct = observer(() => {
  const { globalStore } = useContext(RootStoreContext);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => {
        globalStore.handleOpenDeleteForm();
      }}
    >
      Удалить Товар
    </button>
  );
});
