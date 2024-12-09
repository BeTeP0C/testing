import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import styles from "./styles.module.scss";
import { usenameToCountries } from "../../../../common/countriesToUsename";
import { TableStore } from "../../../../common/stores/tableStore";
import { RootStoreContext } from "../../../../pages/_app";
import { TFunPayItem } from "../../../../types/global";
import { TableInfoPackage } from "./TableInfoPackage/TableInfoPackage";

export const TableInfoPackages = observer(
  (props: {
    funpayItems: TFunPayItem[];
    item: React.MutableRefObject<any>;
    infoRef: React.MutableRefObject<any>;
    setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const { funpayItems, item, infoRef, setAnimation } = props;

    return (
      <div className={styles.content}>
        <h3 className={styles.heading}>Название Package</h3>

        <ul className={styles.list}>
          {funpayItems.map((funpayItem) => {
            return (
              <TableInfoPackage
                key={uuidv4()}
                funpayItem={funpayItem}
                infoRef={infoRef}
                setAnimation={setAnimation}
              />
            );
          })}
        </ul>
      </div>
    );
  },
);
