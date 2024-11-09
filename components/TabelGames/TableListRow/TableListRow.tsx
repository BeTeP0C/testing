import React, { useContext, useEffect } from "react";
import styles from "./styles.module.scss"
import { TableGame } from "../TableGame";
import { observer } from "mobx-react-lite";
import { MagazineStore } from "../../../common/store";
import { StoreContext } from "../../MainPage";

export const TableListRow = observer(() => {
  const magazineStore: MagazineStore = useContext(StoreContext)

  return (
    <ul className={styles.listRow}>
      {magazineStore.games.map((el) => {
        return (
          <TableGame key={el.id}
            game={el}
          />
        )
      })}
    </ul>
  )
})
