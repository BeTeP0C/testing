import React, { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import img from "../../../../public/assassin's_creed_valhala.png";
import { MagazineStore } from "../../../../common/store";
import { TGameError } from "../../../../types/tgames";
import { StoreContext } from "../../../MainPage";

type TAddedGameInputId = {
  setAppId: React.Dispatch<any>;
  title: string;
  idError: TGameError;
};

export const AddedGameInputId = observer(
  ({ setAppId, title, idError }: TAddedGameInputId) => {
    const inputRef = useRef(null);
    const timeoutRef = useRef(null);
    const store: MagazineStore = useContext(StoreContext);

    const changeAppId = (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setAppId(inputRef.current.value);
        clearTimeout(timeoutRef.current);
      }, 500);
    };

    const checkNumberInInput = (e: React.FormEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;

      if (!/^\d+$/.test(value)) {
        e.currentTarget.value = value.slice(0, -1);
      }
    };

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <label className={styles.title} htmlFor="id">
            App ID
            {idError.activate ? (
              <span className={styles.error}>{idError.errorMessage}</span>
            ) : (
              ""
            )}
          </label>
          <input
            ref={inputRef}
            onChange={(e) => changeAppId(e)}
            onInput={(e) => checkNumberInInput(e)}
            className={styles.input}
            type="text"
            name="id"
          />
        </div>

        <div className={styles.right}>
          {(() => {
            if (store.isLoadingConnectSteam) {
              return <span>Подключение к Steam...</span>;
            }
            if (store.isConnectSteam) {
              if (store.settingsData.countries.length === 0) {
                return <span>Добавьте в настройках страны</span>;
              }
              if (store.isLoadingGame) {
                return <span>Ищем игру...</span>;
              }
              if (store.isSearchGame) {
                return (
                  <>
                    {title ? (
                      <img className={styles.img} src={img.src} alt="" />
                    ) : (
                      ""
                    )}
                    <h3 className={styles.heading}>{title}</h3>
                  </>
                );
              }
              return <span>Игра не найдена</span>;
            }
            return "";
          })()}
        </div>
      </div>
    );
  },
);
