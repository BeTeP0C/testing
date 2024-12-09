import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddStore } from "../../../../../common/stores/addStore";
import { GlobalStore } from "../../../../../common/stores/globalStore";
import { RootStoreContext } from "../../../../../pages/_app";

type TAddedGameFormInfo = {
  addStore: AddStore;
  globalStore: GlobalStore;
};

export const AddedGameFormInfo = observer(() => {
  const { addStore, globalStore }: TAddedGameFormInfo =
    useContext(RootStoreContext);

  return (
    <div className={styles.container}>
      {(() => {
        if (
          globalStore.isStateSteam === "loading" ||
          globalStore.isStateSteam === "initializing"
        ) {
          return <span>Подключение к Steam...</span>;
        }
        if (globalStore.isStateSteam === "alive") {
          if (globalStore.userProfile.countries.length === 0) {
            return <span>Добавьте в настройках страны</span>;
          }
          if (addStore.isSearchGame === "loading") {
            return <span>Ищем игру...</span>;
          }
          if (addStore.isSearchGame === "dead") {
            return <span>Игра не найдена</span>;
          }
          if (addStore.isSearchGame === "alive") {
            if (
              addStore.firstPageAddForm.foundGame.countryRestricted &&
              addStore.firstPageAddForm.foundGame.amountCountry === 0
            ) {
              return (
                <span>
                  {addStore.firstPageAddForm.foundGame.titleGame} недоступна в{" "}
                  {globalStore.userProfile.countries
                    .map((el) => el.title)
                    .join(", ")}
                </span>
              );
            }
            return (
              <>
                {addStore.firstPageAddForm.foundGame.titleGame ? (
                  <>
                    {addStore.firstPageAddForm.foundGame.urlImg !== null ? (
                      <img
                        className={styles.img}
                        src={addStore.firstPageAddForm.foundGame.urlImg}
                        alt=""
                        // onError={unvisibleImg}
                      />
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
                <h3 className={styles.heading}>
                  {addStore.firstPageAddForm.foundGame.titleGame}
                </h3>
              </>
            );
          }
        } else {
          return <span>Steam не подключен</span>;
        }
      })()}
    </div>
  );
});
