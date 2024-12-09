import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { TableStore } from "../../../../../common/stores/tableStore";
import { RootStoreContext } from "../../../../../pages/_app";
import { TFunPayItem } from "../../../../../types/global";
import { EditContext } from "../../TableInfo";

type TTableInfoPackage = {
  funpayItem: TFunPayItem;
  infoRef: React.MutableRefObject<any>;
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TableInfoPackage = observer(
  ({ funpayItem, infoRef, setAnimation }: TTableInfoPackage) => {
    const { tableStore } = useContext(RootStoreContext);
    const editRef = useContext(EditContext);

    const handleEditionClick = () => {
      if (funpayItem.active) {
        setAnimation(false);
        tableStore.setHeight(infoRef.current?.offsetHeight);
        setTimeout(() => {
          tableStore.setHeight(0);
          tableStore.handleOpenEdition(
            funpayItem.id,
            infoRef.current?.offsetHeight,
          );
        }, 500);
      } else {
        setAnimation(true);
        tableStore.handleOpenEdition(
          funpayItem.id,
          infoRef.current?.offsetHeight,
        );
      }
    };

    return (
      <li className={`${styles.item}`}>
        <button
          type="button"
          onClick={handleEditionClick}
          className={`${styles.button} ${funpayItem.active ? styles.button_active : ""}`}
        >
          {funpayItem.internalName}
        </button>
      </li>
    );
  },
);
