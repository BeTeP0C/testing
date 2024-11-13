import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss"
import { observer } from "mobx-react-lite";
import { MagazineStore } from "../../common/store";
import { StoreContext } from "../MainPage";

export const Header = observer(() => {
  const store: MagazineStore = useContext(StoreContext)
  const [statusShow, setStatusShow] = useState(false)
  const steamRef = useRef(null)

  useEffect(() => {
    let flag = true

    if (flag) {
      setTimeout(() => {
        setStatusShow(true)
      }, 250)
    }

    return () => {flag = false}
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
          <h1 className={styles.heading}>{store.settingsData.titleStore}</h1>

          <div className={styles.info}>
            {statusShow ?
              <>
                <span ref={steamRef} data-testid="status"
                  className=
                  {`
                    ${styles.status}
                    ${styles.steam}
                    ${store.isLoadingConnectSteam ? styles.steam_loading :
                      store.isConnectSteam ? styles.steam_connect : styles.steam_unconnect}
                  `}>
                  {"Steam: "}
                  {
                    store.isLoadingConnectSteam ? "Подключение..." :
                    store.isConnectSteam ? "Подключен" : "Не подключен"
                  }
                </span>
                <span data-testid="status" className={`${styles.status} ${styles.funpay} ${store.settingsData.funpayActivate ? styles.funpay_active : ""}`}>
                  {"FunPay: "}
                  {
                    store.settingsData.funpayActivate ? "Активен" : "Не активен"
                  }
                  </span>
              </>
              : ""}
          </div>
        </div>
    </header>
  )
})
