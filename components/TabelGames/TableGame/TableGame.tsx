import React, { useContext, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { TableError } from "../../Icons/TableError";
import { TableInfo } from "../TableInfo";
import { TGame } from "../../../types/tgames";
import { MagazineStore } from "../../../common/store";
import { StoreContext } from "../../MainPage";

export const TableGame = observer((props: { game: TGame }) => {
  const { game } = props;
  const dateCreate = game.lastUpdated
    .split(" ")
    .map((el) => {
      if (!el.includes(":")) {
        return el;
      }
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
      dropRef.current.style.height = `${dropRef.current.scrollHeight}px`;
    } else if (dropRef.current) {
      dropRef.current.style.height = "44px";
    }
  }, [magazineStore.isOpenGameInfo, game.id]);

  // ${game.error ? styles.row_error : ""}
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

        {/* <li className={styles.item_error}>
          {game.error ? <TableError /> : ""}
        </li> */}

        <li className={styles.button_item}>
          <button
            className={styles.button}
            onClick={(e) => {
              magazineStore.handleClickGame(game.id);
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
          <TableInfo packages={game.steamItem.packages} />
        </div>
      </CSSTransition>
    </li>
  );
});
