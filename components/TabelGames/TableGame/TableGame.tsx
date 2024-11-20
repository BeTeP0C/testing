import React, { useContext, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { TableInfo } from "../TableInfo";
import { TGame } from "../../../types/tgames";
import { MagazineStore } from "../../../common/store";
import { StoreContext } from "../../MainPage";

export const TableGame = observer((props: { game: TGame }) => {
  const { game } = props;
  const [openInfoStore, setOpenInfoStore] = useState(true);
  const dateCreate = game.lastUpdated
    .split(" ")
    .map((el) => {
      if (!el.includes(":")) {
        return el;
      }

      return null;
    })
    .join(" ");
  const dropRef = useRef(null);
  const magazineStore: MagazineStore = useContext(StoreContext);

  useEffect(() => {
    if (
      magazineStore.isOpenGameInfo.open &&
      magazineStore.isOpenGameInfo.id === game.id &&
      dropRef.current
    ) {
      dropRef.current.style.height = `${dropRef.current.scrollHeight - magazineStore.negativeHeight}px`;
    } else if (dropRef.current) {
      dropRef.current.style.height = "44px";
    }
  }, [magazineStore.isOpenGameInfo, game.id]);

  return (
    <li
      className={`
      ${styles.row}
      ${magazineStore.isOpenGameInfo.open && magazineStore.isOpenGameInfo.id === game.id ? styles.row_active : ""}
    `}
      ref={dropRef}
    >
      <ul className={styles.listCell}>
        <li className={styles.cell}>{dateCreate}</li>
        <li className={styles.cell}>{game.steamItem.name}</li>
        <li className={styles.cell}>{game.steamItemId}</li>
        <li className={styles.cell}>{game.lastUpdated}</li>

        <li className={styles.button_item}>
          <button
            type="button"
            className={styles.button}
            onClick={(e) => {
              magazineStore.handleClickGame(game.id, game.funPayItemId);
            }}
          />
        </li>
      </ul>

      <CSSTransition
        in={
          magazineStore.isOpenGameInfo.open &&
          magazineStore.isOpenGameInfo.id === game.id
        }
        timeout={500}
        classNames="drop-animation"
        unmountOnExit
      >
        <div className={styles.drop}>
          <TableInfo
            packages={game.steamItem.packages}
            funpayItems={game.funPayItems}
            setOpenInfoStore={setOpenInfoStore}
            openInfoStore={openInfoStore}
          />
        </div>
      </CSSTransition>
    </li>
  );
});
