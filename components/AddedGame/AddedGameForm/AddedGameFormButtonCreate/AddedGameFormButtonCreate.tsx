import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { StoreContext } from "../../../MainPage";
import { TEditionsOptions } from "../../../../types/edtitionInfo";

type TAddedGameFormButtonCreate = {
  appId: number;
  packageId: number;
  title: string;
  isGlobal: boolean;
  titleGame: string;
  editionsOptions: TEditionsOptions[];
};

export const AddedGameFormButtonCreate = observer(
  (props: TAddedGameFormButtonCreate) => {
    const { appId, packageId, title, isGlobal, titleGame, editionsOptions } =
      props;
    const editionSelect = editionsOptions.find((el) => el.active);
    const store = useContext(StoreContext);

    return (
      // <button onClick={async () =>  store.postGame(appId,packageId,title)} className={styles.button}>Создать</button>
      <button
        onClick={() =>
          store.postGame(
            appId,
            packageId,
            title,
            titleGame,
            isGlobal,
            editionSelect,
          )
        }
        className={styles.button}
      >
        Создать
      </button>
    );
  },
);
