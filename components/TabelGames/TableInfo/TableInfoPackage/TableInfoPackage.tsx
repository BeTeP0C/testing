import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { TGameInfoPackage, TFunPayItem } from "../../../../types/tgames";
import { StoreContext } from "../../../MainPage";
import { MagazineStore } from "../../../../common/store";

export const TableInfoPackage = observer(
  (props: {
    funpayItems: TFunPayItem[];
    item: React.MutableRefObject<any>;
  }) => {
    const { funpayItems, item } = props;
    const store: MagazineStore = useContext(StoreContext);

    const handleOpenInfoFunpay = (id: number) => {
      store.changeOpenGameInfo(
        id,
        item.current ? item.current.offsetHeight : 0,
      );
    };

    return (
      <div className={styles.content}>
        <h3 className={styles.heading}>Название Package</h3>

        <ul className={styles.list}>
          {funpayItems.map((funpayItem) => {
            return (
              <li key={uuidv4()} className={`${styles.item}`}>
                <button
                  type="button"
                  onClick={(e) => handleOpenInfoFunpay(funpayItem.id)}
                  className={`${styles.button} ${funpayItem.active && store.isOpenGameInfo.funpay_active ? styles.button_active : ""}`}
                >
                  {funpayItem.internalName}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);
