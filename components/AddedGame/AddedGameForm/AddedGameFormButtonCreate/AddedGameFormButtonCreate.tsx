import React, { useContext, useState } from "react";
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
  errors: {
    errorMessage: string,
    visible: boolean,
    activate: boolean
  }[],
  setErrors: React.Dispatch<React.SetStateAction<{
    errorMessage: string;
    visible: boolean;
    activate: boolean;
  }[]>>,
  setIsError: React.Dispatch<React.SetStateAction<{
    errorMessage: string;
    active: boolean;
  }>>
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
      errors,
      setErrors,
      setIsError
    } = props;
    const editionSelect = editionsOptions.find((el) => el.active);
    const store = useContext(StoreContext);

    const handlePostGame = async () => {
      if (!errors.some(el => el.activate)) {
        const newEditionSelect = await store.postGame(
          appId,
          packageId,
          title,
          titleGame,
          isGlobal,
          editionSelect,
          editionsOptions,
        );

        if (newEditionSelect?.type === "steam") {
          if (newEditionSelect?.status === 400) {
            setIsError({
              errorMessage: "Это издание уже Добавлено",
              active: true
            })
          } else if (newEditionSelect?.status === 500) {
            setIsError({
              errorMessage: "Попробуйте позже",
              active: true
            })
          }
        } else if (newEditionSelect?.type === "funpay") {
          if (newEditionSelect?.status === 400) {
            setIsError({
              errorMessage: "Этот товар уже был добавлен",
              active: true
            })
          } else if (newEditionSelect.status === 500) {
            setIsError({
              errorMessage: "Проверьте поля и попробуйте еще раз",
              active: true
            })
          }
        } else if (newEditionSelect !== "") {
          const nextEl: number | null = null;

          setIsError({
            errorMessage: "",
            active: false
          })

          const arr1 = editionsOptions.map((el, index) => {
            if (el.id === newEditionSelect?.id) {
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
          });

          setEditionSelect(arr2);
        } else {
          setIsError({
            errorMessage: "",
            active: false
          })
          setEditionOptions([]);
        }


      } else {
        setErrors(errors.map((el, index) => {
          if (errors[0].activate) {
            if (index === 0) {
              return {
                ...el,
                visible: true
              }
            }
            return {...el, visible: false}
          }

          return {
            ...el,
            visible: el?.activate
          }
        }))
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
