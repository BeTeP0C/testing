import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { EditorGame } from "../EditorGame";
import { AddedGame } from "../AddedGame";
import { MagazineStore } from "../../common/store";

export const ActionsOverGame = observer((props: { store: MagazineStore }) => {
  const { store } = props;

  // useEffect(() => {
  //   console.log(store.isOpenActionsGame)
  // }, [store.isOpenActionsGame])

  return (
    <div
      className={`${styles.content} ${store.isOpenActionsGame ? styles.content_active : ""}`}
    >
      <CSSTransition
        in={store.isOpenGameInfo.open} // Управляем видимостью  с  помощью  showElement
        timeout={500} // Задержка  в  500  мс
        classNames="fade-out" // Используем  класс  fade-out  для  анимации
        unmountOnExit // Удаляем  элемент  из  DOM  при  отключении
      >
        <EditorGame info={store.isOpenGameInfo} />
      </CSSTransition>

      <CSSTransition
        in={store.isOpenAddForm} // Управляем видимостью  с  помощью  showElement
        timeout={500} // Задержка  в  500  мс
        classNames="fade-out" // Используем  класс  fade-out  для  анимации
        unmountOnExit // Удаляем  элемент  из  DOM  при  отключении
      >
        <AddedGame />
      </CSSTransition>
    </div>
  );
});
