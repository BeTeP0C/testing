import React from "react";
import styles from "./styles.module.scss";
import { TGameInfoStore } from "../../../../types/tgames";
import { TableInfoPlatforms } from "../TableInfoPlatforms";

export const TableInfoStores = (props: { stores: TGameInfoStore[] }) => {
  const { stores } = props;

  return (
    <div className={styles.content}>
      <h3 className={styles.heading}>Обьявления</h3>

      <TableInfoPlatforms platforms={stores} />
    </div>
  );
};
