import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { CSSTransition } from "react-transition-group";
import styles from "./styles.module.scss";
import { TFunPayItem } from "../../../../types/global";
import { TableInfoFunpayItem } from "../TableInfoFunpayItem";
import { TableInfoProductEdit } from "../TableInfoProductEdit";
import { TableStore } from "../../../../common/stores/tableStore";
import { RootStoreContext } from "../../../../pages/_app";
import { EditContext } from "../TableInfo";

type TTableInfoCountries = {
  funpayItem: TFunPayItem;
  countriesRef: React.MutableRefObject<HTMLDivElement>;
  editRef: React.MutableRefObject<HTMLDivElement>;
  infoRef: React.MutableRefObject<HTMLDivElement>;
};

export const TableInfoCountries = observer(
  ({ funpayItem, countriesRef, editRef, infoRef }: TTableInfoCountries) => {
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    return (
      <CSSTransition
        in={funpayItem.stores.some((store) => store.active)}
        timeout={500}
        classNames="drop-animation"
        unmountOnExit
      >
        <div ref={countriesRef} className={styles.container}>
          <ul className={`${styles.list}`}>
            {funpayItem.stores.map((store) => {
              if (store.storeName === "FunPay") {
                return (
                  <CSSTransition
                    in={store.active}
                    timeout={500}
                    classNames="drop-animation"
                    unmountOnExit
                  >
                    <>
                      {store.items.map((item) => {
                        return (
                          <TableInfoFunpayItem
                            key={item.offerId}
                            funpayItem={item}
                            title={funpayItem.internalName}
                            editRef={editRef}
                            setIsAnimating={setIsAnimating}
                          />
                        );
                      })}
                    </>
                  </CSSTransition>
                );
              }
              return "";
            })}
          </ul>

          {funpayItem.stores.map((store) => {
            if (store.storeName === "FunPay") {
              return (
                <CSSTransition
                  in={store.active && store.items.some((item) => item.active)}
                  timeout={500}
                  classNames="drop-animation"
                  unmountOnExit
                >
                  <TableInfoProductEdit
                    store={store}
                    editRef={editRef}
                    isAnimating={isAnimating}
                    infoRef={infoRef}
                  />
                </CSSTransition>
              );
            }
            return "";
          })}
        </div>
      </CSSTransition>
    );
  },
);
