import React, { useContext, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import styles from "./styles.module.scss";
import { TableStore } from "../../../../common/stores/tableStore";
import { RootStoreContext } from "../../../../pages/_app";
import { TFunPayItem } from "../../../../types/global";
import { TableInfoCountries } from "../TableInfoCountries";

export const TableInfoFunpayList = observer(
  (props: {
    funpayItem: TFunPayItem;
    animation: boolean;
    editRef: React.MutableRefObject<HTMLDivElement>;
    infoRef: React.MutableRefObject<HTMLDivElement>;
  }) => {
    const { funpayItem, animation, editRef, infoRef } = props;
    const { tableStore } = useContext(RootStoreContext);
    const countriesRef = useRef<HTMLDivElement | null>(null);

    return (
      <div className={styles.container}>
        <h4 className={`${styles.title}`}>
          <button
            type="button"
            className={`${styles.button} ${funpayItem.stores.some((item) => item.active) ? styles.button_open : ""}`}
            onClick={() =>
              tableStore.handleOpenStore(
                "FunPay",
                countriesRef.current?.offsetHeight,
              )
            }
          >
            FunPay
          </button>
        </h4>

        <TableInfoCountries
          countriesRef={countriesRef}
          funpayItem={funpayItem}
          editRef={editRef}
          infoRef={infoRef}
        />
      </div>
    );
  },
);
