import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";
import styles from "./styles.module.scss";
import { TFunPayStore } from "../../../../types/global";
import { TableInfoProductEditBrief } from "./TableInfoProductEditBrief";
import { TableInfoProductEditFull } from "./TableInfoProductEditFull";
import { TableInfoProductEditFunctionals } from "./TableInfoProductEditFunctionals";

type TTableInfoProductEdit = {
  store: TFunPayStore;
  editRef: React.MutableRefObject<HTMLDivElement>;
  infoRef: React.MutableRefObject<HTMLDivElement>;
  isAnimating: boolean;
};

export const TableInfoProductEdit = observer(
  ({ store, editRef, isAnimating, infoRef }: TTableInfoProductEdit) => {
    const briefRef = useRef<null | HTMLInputElement>(null);
    const fullRef = useRef<null | HTMLTextAreaElement>(null);
    const [briefValue, setBriefValue] = useState<string>("");
    const [fullValue, setFullValue] = useState<string>("");

    return (
      <CSSTransition in={isAnimating} timeout={500} classNames="drop-animation">
        <>
          {store.items.map((item) => {
            if (item.active) {
              return (
                <div ref={editRef} className={styles.info}>
                  <TableInfoProductEditBrief
                    item={item}
                    briefRef={briefRef}
                    setBriefValue={setBriefValue}
                  />
                  <TableInfoProductEditFull
                    item={item}
                    fullRef={fullRef}
                    setFullValue={setFullValue}
                  />
                  <TableInfoProductEditFunctionals
                    item={item}
                    briefDescr={briefValue}
                    fullDescr={fullValue}
                    editRef={editRef}
                    infoRef={infoRef}
                  />
                </div>
              );
            }
            return "";
          })}
        </>
      </CSSTransition>
    );
  },
);
