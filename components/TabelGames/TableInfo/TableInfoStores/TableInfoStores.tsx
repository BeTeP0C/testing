import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";
import styles from "./styles.module.scss";
import { TProduct } from "../../../../types/global";
import { TableInfoFunpayList } from "../TableInfoFunpayList";

type TTableInfoStores = {
  product: TProduct;
  infoRef: React.MutableRefObject<HTMLDivElement>;
  animation: boolean;
  editRef: React.MutableRefObject<HTMLDivElement>;
};

export const TableInfoStores = observer(
  ({ product, infoRef, animation, editRef }: TTableInfoStores) => {
    return (
      <CSSTransition
        in={animation}
        timeout={500}
        classNames="drop-animation"
        unmountOnExit
      >
        <div className={styles.stores} ref={infoRef}>
          {product.funPayItems.map((el) => {
            if (el.active) {
              return (
                <>
                  <h3 className={styles.heading}>Объявления</h3>
                  <TableInfoFunpayList
                    funpayItem={el}
                    animation={animation}
                    editRef={editRef}
                    infoRef={infoRef}
                  />
                </>
              );
            }
            return "";
          })}
        </div>
      </CSSTransition>
    );
  },
);
