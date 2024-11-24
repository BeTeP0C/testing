import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { StoreContext } from "../MainPage";
import { MagazineStore } from "../../common/store";

export const DeleteWindow = observer(() => {
  const store: MagazineStore = useContext(StoreContext);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteProduct = async () => {
    const resp = await store.handleDeleteGame();

    if (resp.status === 200) {
      setIsError(false);
      setErrorMessage("");
    } else if (resp.status === 400) {
      setIsError(true);
      setErrorMessage("Попробуйте обновить ключ фанпея");
    } else if (resp.status === 500) {
      setIsError(true);
      setErrorMessage("Попробуйте позже");
    }
  };

  return (
    <div
      className={`${styles.container} ${store.isOpenDelete ? styles.container_active : ""}`}
    >
      <div className={styles.content}>
        <h2 className={styles.heading}>
          Вы действительно хотите удалить товар целиком?
        </h2>

        {isError ? <span className={styles.error}>{errorMessage}</span> : ""}

        <button
          type="button"
          className={styles.delete}
          onClick={() => handleDeleteProduct()}
        >
          Удалить
        </button>
      </div>

      <button
        type="button"
        className={styles.close}
        onClick={() => store.handleCloseModal()}
      />
    </div>
  );
});
