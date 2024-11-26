import React, { memo, useContext, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import styles from "./styles.module.scss";
import { TableInfoPackage } from "./TableInfoPackage";
import { TGameInfoPackage, TFunPayItem } from "../../../types/tgames";
import { TableInfoFunpayList } from "./TableInfoFunpayList";
import { StoreContext } from "../../MainPage";
import { MagazineStore } from "../../../common/store";

export const TableInfo = observer(
  (props: {
    packages: TGameInfoPackage[];
    funpayItems: TFunPayItem[];
    setOpenInfoStore: React.Dispatch<React.SetStateAction<boolean>>;
    openInfoStore: boolean;
  }) => {
    const { packages, funpayItems, setOpenInfoStore, openInfoStore } = props;
    const storeRef = useRef(null);
    const store: MagazineStore = useContext(StoreContext);
    const infoRef = useRef(null);

    return (
      <div className={styles.content}>
        <TableInfoPackage
          funpayItems={funpayItems}
          item={storeRef}
          infoRef={infoRef}
        />

        <CSSTransition
          in={
            funpayItems.length !== 0 && store.isOpenGameInfo.funpay_active
            // && funpayItems.some(el => el.active)
          }
          timeout={500}
          classNames="drop-animation"
          unmountOnExit
        >
          <div ref={storeRef} className={styles.stores}>
            <h3 className={styles.heading}>Объявления</h3>

            {funpayItems.map((el) => {
              if (el.active) {
                return (
                  <CSSTransition
                    key={el.id}
                    in={el.active && store.isOpenGameInfo.funpayId === el.id}
                    timeout={500}
                    classNames="drop-animation"
                    unmountOnExit
                  >
                    <TableInfoFunpayList
                      funpayItem={el}
                      setOpenInfoStore={setOpenInfoStore}
                      openInfoStore={openInfoStore}
                      container={storeRef}
                      infoRef={infoRef}
                    />
                  </CSSTransition>
                );
              }
              return "";
            })}
          </div>
        </CSSTransition>
      </div>
    );
  },
);
