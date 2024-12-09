import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { GlobalStore } from "../../common/stores/globalStore";
import { RootStoreContext } from "../../pages/_app";
import { EditorStore } from "../../common/stores/editorStore";
import { ErrorsStore } from "../../common/stores/errorsStore";

type TDeleteWindow = {
  globalStore: GlobalStore;
  editorStore: EditorStore;
  errorsStore: ErrorsStore;
};

export const DeleteWindow = observer(() => {
  const { globalStore, editorStore, errorsStore }: TDeleteWindow =
    useContext(RootStoreContext);

  return (
    <div
      className={`${styles.container} ${globalStore.isOpenDeleteForm ? styles.container_active : ""}`}
    >
      <div className={styles.content}>
        <h2 className={styles.heading}>
          Вы действительно хотите удалить товар целиком?
        </h2>

        {errorsStore.deleteFormErrors.active ? (
          <span className={styles.error}>
            {errorsStore.deleteFormErrors.message}
          </span>
        ) : (
          ""
        )}

        <button
          type="button"
          className={styles.delete}
          onClick={() => {
            if (globalStore.isTypeDeleting === "prod") {
              globalStore.deleteProductData();
            } else if (globalStore.isTypeDeleting === "table") {
              editorStore.deleteFunpayCountry();
            }
          }}
        >
          {globalStore.isDeleteState === "loading"
            ? "Удаляем..."
            : globalStore.isDeleteState === "dead"
              ? "Удалить"
              : ""}
        </button>
      </div>

      <button
        type="button"
        className={styles.close}
        onClick={() => globalStore.handleCloseDeleteForm()}
      />
    </div>
  );
});
