import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import img from "../../../../public/assassin's_creed_valhala.png";
import { MagazineStore } from "../../../../common/store";
import { TGameError } from "../../../../types/tgames";
import { StoreContext } from "../../../MainPage";
import { TEditionTransformSteamGame } from "../../../../types/editionTransformSteamGame";

type TAddedGameInputId = {
  setAppId: React.Dispatch<any>;
  steamGame: TEditionTransformSteamGame;
  title: string;
  url: string | null;
  idError: TGameError;
};

export const AddedGameInputId = observer(
  ({ setAppId, title, idError, url, steamGame }: TAddedGameInputId) => {
    const inputRef = useRef(null);
    const timeoutRef = useRef(null);
    const [isErImg, setIsErImg] = useState(false);
    const store: MagazineStore = useContext(StoreContext);

    useEffect(() => {
      setIsErImg(false);
    }, [title]);

    const unvisibleImg = () => {
      setIsErImg(true);
    };

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
                if (
                  steamGame.countryRestricted &&
                  steamGame.packages.length === 0
                ) {
                  return (
                    <span>
                      {steamGame.name} недоступна в{" "}
                      {store.settingsData.countries
                        .map((el) => el.title)
                        .join(", ")}
                    </span>
                  );
                }
                return (
                  <>
                    {title ? (
                      <>
                        {url !== null && !isErImg ? (
                          <img
                            className={styles.img}
                            src={url}
                            alt=""
                            onError={unvisibleImg}
                          />
                        ) : (
                          ""
                        )}
                      </>
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
