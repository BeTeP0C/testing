import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddStore } from "../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../pages/_app";

export const AddedGameFormButtonCreate = observer(() => {
  const { addStore } = useContext(RootStoreContext);

  return (
    <button
      type="button"
      onClick={async () => await addStore.handleCreateProduct()}
      className={styles.button}
    >
      {(() => {
        if (addStore.isSuccessfullyCreateProd === "dead") {
          return "Создать";
        }
        if (addStore.isSuccessfullyCreateProd === "loading") {
          return "Добавляем игру...";
        }
        if (addStore.isSuccessfullyCreateProd === "alive") {
          return "Игра успешно добавлена";
        }
        return "";
      })()}
    </button>
  );
});
