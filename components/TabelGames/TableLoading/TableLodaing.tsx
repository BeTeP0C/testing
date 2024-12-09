import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

export const TableLoading = observer(() => {
  return <div className={styles.spinner} />;
});
