import React, { memo } from "react";
import styles from "./styles.module.scss";
import { TableInfoPackage } from "./TableInfoPackage";
import { TableInfoStores } from "./TableInfoStores";
import {
  TGameInfo,
  TGameInfoStore,
  TGameInfoPackage,
} from "../../../types/tgames";

export const TableInfo = memo((props: { packages: TGameInfoPackage[] }) => {
  const { packages } = props;

  return (
    <div className={styles.content}>
      <TableInfoPackage packages={packages} />
      {/* <TableInfoStores stores={stores}/> */}
    </div>
  );
});
