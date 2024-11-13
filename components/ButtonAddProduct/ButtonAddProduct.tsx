import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { MagazineStore } from "../../common/store";
import { StoreContext } from "../MainPage";

export const ButtonAddProduct = observer(() => {
  const store: MagazineStore = useContext(StoreContext);

  return (
    <button
      type="button"
      onClick={() => store.handleClickAddGame()}
      className={styles.button}
    >
      Добавить товар
    </button>
  );
});
