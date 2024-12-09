import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { GlobalStore } from "../../common/stores/globalStore";
import { RootStoreContext } from "../../pages/_app";

export const Header = observer(() => {
  const { globalStore } = useContext(RootStoreContext);
  const steamRef = useRef(null);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {globalStore.isAuthorizate ? (
          <>
            <h1 className={styles.heading}>
              {globalStore.userProfile.storeName}
            </h1>

            <div className={styles.info}>
              <span
                ref={steamRef}
                data-testid="status"
                className={`
                    ${styles.status}
                    ${styles.steam}
                    ${(() => {
                      if (
                        globalStore.isStateSteam === "loading" ||
                        globalStore.isStateSteam === "initializing"
                      ) {
                        return styles.steam_loading;
                      }
                      if (globalStore.isStateSteam === "alive") {
                        return styles.steam_connect;
                      }
                      return styles.steam_unconnect;
                    })()}
                  `}
              >
                {"Steam: "}
                {(() => {
                  if (
                    globalStore.isStateSteam === "loading" ||
                    globalStore.isStateSteam === "initializing"
                  ) {
                    return "Подключение...";
                  }
                  if (globalStore.isStateSteam === "alive") {
                    return "Подключен";
                  }
                  return "Не подключен";
                })()}
              </span>
              <span
                data-testid="status"
                className={`
                  ${styles.status}
                  ${styles.funpay}
                  ${(() => {
                    if (
                      globalStore.isStateFunPay === "loading" ||
                      globalStore.isStateFunPay === "initializing"
                    ) {
                      return styles.funpay_loading;
                    }
                    if (globalStore.isStateFunPay === "alive") {
                      return styles.funpay_connect;
                    }
                    return styles.funpay_unconnect;
                  })()}
                `}
              >
                {"FunPay: "}
                {(() => {
                  if (
                    globalStore.isStateFunPay === "loading" ||
                    globalStore.isStateFunPay === "initializing"
                  ) {
                    return "Подключение...";
                  }
                  if (globalStore.isStateFunPay === "alive") {
                    return "Подключен";
                  }
                  return "Не подключен";
                })()}
              </span>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </header>
  );
});
