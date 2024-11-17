import React, { memo } from "react";
import styles from "./styles.module.scss";
import { TableInfoPackage } from "./TableInfoPackage";
import { TGameInfoPackage } from "../../../types/tgames";
import { TFunPayItem } from "../../../types/tgames";
import { TableInfoFunpayList } from "./TableInfoFunpayList";

export const TableInfo = memo((props: { packages: TGameInfoPackage[],  funpayItems: TFunPayItem[], setOpenInfoStore: React.Dispatch<React.SetStateAction<boolean>>, openInfoStore: boolean}) => {
  const { packages, funpayItems, setOpenInfoStore, openInfoStore} = props;

  return (
    <div className={styles.content}>
      <TableInfoPackage packages={packages} />

      {funpayItems.length !== 0 ?
          <div className={styles.stores}>
            <h3 className={styles.heading}>Объявления</h3>

            {funpayItems.map(el => {
              return <TableInfoFunpayList funpayItem={el} setOpenInfoStore={setOpenInfoStore} openInfoStore={openInfoStore}/>
            })}
          </div>
        : ""}

    </div>
  );
});
