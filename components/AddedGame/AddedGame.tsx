import React, { useContext, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddedGameSteps } from "./AddedGameSteps";
import { AddedGameForm } from "./AddedGameForm";
import { RootStoreContext } from "../../pages/_app";
import { AddStore } from "../../common/stores/addStore";
import { AddedGameFormFirstPage } from "./AddedGameForm/AddedGameFormFirstPage";
import { AddedGameFormSecondPage } from "./AddedGameForm/AddedGameFormSecondPage";

export const AddedGame = observer(() => {
  const { addStore } = useContext(RootStoreContext);
  const firstRef = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef(null);

  useEffect(() => {
    if (addStore.numberActivePage === 2) {
      firstRef.current.style.transform = `translateX(-${firstRef.current.offsetWidth + 200}px)`;
      secondRef.current.style.transform = `translateX(0px)`;
    } else if (addStore.numberActivePage === 1) {
      firstRef.current.style.transform = `translateX(0px)`;
      secondRef.current.style.transform = `translateX(${secondRef.current.offsetWidth + 200}px)`;
    }
  }, [addStore.numberActivePage]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Добавление товара</h2>

      <AddedGameSteps numberStep={addStore.numberActivePage} />

      <AddedGameForm>
        <div className={styles.form}>
          <AddedGameFormFirstPage
            firstRef={firstRef}
            numberStep={addStore.numberActivePage}
          />
          <AddedGameFormSecondPage
            secondRef={secondRef}
            numberStep={addStore.numberActivePage}
          />
        </div>
      </AddedGameForm>
    </div>
  );
});
