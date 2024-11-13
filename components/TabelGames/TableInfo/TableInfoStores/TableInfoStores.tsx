import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.scss";
import { TGameInfo, TGameInfoStore } from "../../../../types/tgames";
import { TableInfoPlatforms } from "../TableInfoPlatforms";
// import { observer } from "mobx-react-lite";
// import { MagazineStore } from "../../../../common/store";

// const magazineStore = new MagazineStore ()

export const TableInfoStores = (props: { stores: TGameInfoStore[] }) => {
  const { stores } = props;

  return (
    <div className={styles.content}>
      <h3 className={styles.heading}>Обьявления</h3>

      <TableInfoPlatforms platforms={stores} />
    </div>
  );
};
