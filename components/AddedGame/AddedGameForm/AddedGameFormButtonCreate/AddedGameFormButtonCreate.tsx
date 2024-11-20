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
  setEditionOptions: React.Dispatch<React.SetStateAction<any[]>>;
  setEditionSelect: React.Dispatch<React.SetStateAction<any[]>>;
};

export const AddedGameFormButtonCreate = observer(
  (props: TAddedGameFormButtonCreate) => {
    const {
      appId,
      packageId,
      title,
      isGlobal,
      titleGame,
      editionsOptions,
      setEditionSelect,
      setEditionOptions,
    } = props;
    const editionSelect = editionsOptions.find((el) => el.active);
    const store = useContext(StoreContext);

    const handlePostGame = async () => {
      const newEditionSelect = await store.postGame(
        appId,
        packageId,
        title,
        titleGame,
        isGlobal,
        editionSelect,
        editionsOptions,
      );

      if (newEditionSelect !== "") {
        const nextEl: number | null = null;

        const arr1 = editionsOptions.map((el, index) => {
          if (el.id === newEditionSelect.id) {
            return {
              ...newEditionSelect,
              regions: el.regions.map((region) => {
                return { ...region, active: false };
              }),
            };
          }

          return {
            ...el,
            regions: el.regions.map((region) => {
              return { ...region, active: false };
            }),
          };
        });

        const arr3 = arr1.sort((a, b) => {
          if (Number(a.posted) > Number(b.posted)) {
            return 1;
          }
          return -1;
        });

        const arr2 = arr1.map((el, index) => {
          if (index === 0 && !el.posted) {
            return {
              ...el,
              active: true,
            };
          }
          if (el.posted) {
            return {
              ...el,
              active: false,
            };
          }

          return { ...el };
          // if (el.posted) {
          //   nextEl+=1
          //   return {
          //     ...el,
          //     active: false,
          //   }
          // }

          // if (nextEl === index) {
          //   return {...el, active: true}
          // }

          // return {...el}
        });

        setEditionSelect(arr2);
      } else {
        setEditionOptions([]);
      }
    };

    return (
      <button
        type="button"
        onClick={() => handlePostGame()}
        className={styles.button}
      >
        Создать
      </button>
    );
  },
);
