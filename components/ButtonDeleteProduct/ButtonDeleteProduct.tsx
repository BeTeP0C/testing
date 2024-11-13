import React from "react";
import styles from "./styles.module.scss";
import { MagazineStore } from "../../common/store";

export function ButtonDeleteProduct(props: { store: MagazineStore }) {
  const { store } = props;

  return (
    <button
      className={styles.button}
      onClick={() => store.handleDeleteGame(store.isOpenGameInfo.id)}
    >
      Удалить Товар
    </button>
  );
}
