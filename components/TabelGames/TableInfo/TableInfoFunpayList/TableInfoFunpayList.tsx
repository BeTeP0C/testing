import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss"
import { CSSTransition } from "react-transition-group";
import { TFunPayItem } from "../../../../types/tgames";
import { TableInfoFunpayItem } from "../TableInfoFunpayItem";
import { observer } from "mobx-react-lite";
import { MagazineStore } from "../../../../common/store";
import { StoreContext } from "../../../MainPage";

export const TableInfoFunpayList = observer((props: {funpayItem: TFunPayItem, setOpenInfoStore: React.Dispatch<React.SetStateAction<boolean>>, openInfoStore: boolean}) => {
  const {funpayItem, setOpenInfoStore, openInfoStore} = props
  const store: MagazineStore = useContext(StoreContext)

  return (
    <div className={styles.container}>
      <h4 className={`${styles.title} ${store.isOpenGameInfo.openStore ? styles.title_open : ""}`}>
        <button type="button" className={styles.button} onClick={() => store.handleOpenInfoStore()}>
          FunPay
        </button>
      </h4>

      {/* <CSSTransition
        in={store.isOpenGameInfo.openStore}
        timeout={300}
        classNames="drop-animation"
        unmountOnExit
      >

      </CSSTransition> */}

      {store.isOpenGameInfo.openStore ? (
        <ul className={`${styles.list}`}>
          {funpayItem.items.map(el => {
            return (
              <TableInfoFunpayItem key={el.offerId} funpayItem={el} title={funpayItem.internalName}/>
            )
          })}
        </ul>
      ): ""}
    </div>
  )
})
