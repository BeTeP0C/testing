import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import styles from "./styles.module.scss";
import { TableInfo } from "../TableInfo";
import { TProduct } from "../../../types/global";
import { TableStore } from "../../../common/stores/tableStore";
import { RootStoreContext } from "../../../pages/_app";
import { TableListRow } from "../TableListRow";

export const InfoContext = createContext<any | null>(null);

export const TableGame = observer((props: { product: TProduct }) => {
  const { tableStore } = useContext(RootStoreContext);

  const { product } = props;
  const dateCreate = product.lastUpdated
    .split(" ")
    .map((el) => {
      if (!el.includes(":")) {
        return el;
      }

      return null;
    })
    .join(" ");
  const dropRef = useRef(null);

  useEffect(() => {
    if (product.active && dropRef.current) {
      if (tableStore.negativeHeight === 0) {
        dropRef.current.style.height = `${dropRef.current.scrollHeight}px`;
      } else {
        dropRef.current.style.height = `${dropRef.current.offsetHeight - tableStore.negativeHeight}px`;
      }
    } else if (dropRef.current) {
      dropRef.current.style.height = "44px";
    }
  }, [product, tableStore.negativeHeight]);

  return (
    <li
      className={`
      ${styles.row}
      ${product.active ? styles.row_active : ""}
    `}
      ref={dropRef}
    >
      <ul className={styles.listCell}>
        <li className={styles.cell}>{dateCreate}</li>
        <li className={styles.cell}>{product.name}</li>
        <li className={styles.cell}>{product.steamItemId}</li>
        <li className={styles.cell}>{product.lastUpdated}</li>
        <li className={styles.button_item}>
          <button
            type="button"
            className={styles.button}
            onClick={(e) => {
              tableStore.handleOpenProduct(product.id);
            }}
          />
        </li>
      </ul>

      <CSSTransition
        in={product.active}
        timeout={500}
        classNames="drop-animation"
        unmountOnExit
      >
        <InfoContext.Provider value={dropRef}>
          <TableInfo product={product} />
        </InfoContext.Provider>
      </CSSTransition>
    </li>
  );
});
