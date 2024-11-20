import React, { useContext, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import styles from "./styles.module.scss";
import { TFunPayItem } from "../../../../types/tgames";
import { TableInfoFunpayItem } from "../TableInfoFunpayItem";
import { MagazineStore } from "../../../../common/store";
import { StoreContext } from "../../../MainPage";

export const TableInfoFunpayList = observer(
  (props: {
    funpayItem: TFunPayItem;
    setOpenInfoStore: React.Dispatch<React.SetStateAction<boolean>>;
    openInfoStore: boolean;
  }) => {
    const { funpayItem, setOpenInfoStore, openInfoStore } = props;
    const contentRef = useRef(null);
    const infoRef = useRef(null);
    const store: MagazineStore = useContext(StoreContext);

    return (
      <div className={styles.container}>
        <h4
          className={`${styles.title} ${store.isOpenGameInfo.openStore ? styles.title_open : ""}`}
        >
          <button
            type="button"
            className={styles.button}
            onClick={() =>
              store.handleOpenInfoStore(
                contentRef.current ? contentRef.current.offsetHeight : 0,
              )
            }
          >
            FunPay
          </button>
        </h4>

        <CSSTransition
          in={store.isOpenGameInfo.openStore}
          timeout={500}
          classNames="drop-animation"
          unmountOnExit
        >
          <div ref={contentRef}>
            <ul className={`${styles.list}`}>
              {funpayItem.items.map((el) => {
                return (
                  <>
                    <TableInfoFunpayItem
                      key={el.offerId}
                      funpayItem={el}
                      title={funpayItem.internalName}
                      item={infoRef}
                    />
                  </>
                );
              })}
            </ul>
            {funpayItem.items.map((el) => {
              return (
                <>
                  {el.active ? (
                    <CSSTransition
                      in={store.isOpenGameInfo.funpayCountryActive}
                      timeout={500}
                      classNames="drop-animation"
                      unmountOnExit
                    >
                      <div ref={infoRef} className={styles.info}>
                        <div className={styles.brief_descr}>
                          <h5 className={styles.label}>Краткое описание</h5>
                          <div className={styles.input}>
                            {el.shortDescriptionRu}
                            <span className={styles.counter}>
                              {el.shortDescriptionRu.length}/100
                            </span>
                          </div>
                        </div>

                        <div className={styles.full_descr}>
                          <h5 className={styles.label}>
                            Полное описание {funpayItem.id}
                            {el.country}
                          </h5>
                          <div className={styles.text}>
                            {el.longDescriptionRu}
                            <span
                              className={`${styles.counter} ${styles.counter_text}`}
                            >
                              {el.longDescriptionRu.length}/500
                            </span>
                          </div>
                        </div>

                        <button type="button" className={styles.button_edit}>
                          Редактировать
                        </button>
                      </div>
                    </CSSTransition>
                  ) : (
                    ""
                  )}
                  {/* {el.active ? (

                  ): ""} */}
                </>
              );
            })}
          </div>
        </CSSTransition>

        {/* {store.isOpenGameInfo.openStore ? (

      ): ""} */}
      </div>
    );
  },
);
