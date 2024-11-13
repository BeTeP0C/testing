import React from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { EditorGame } from "../EditorGame";
import { AddedGame } from "../AddedGame";
import { MagazineStore } from "../../common/store";

export const ActionsOverGame = observer((props: { store: MagazineStore }) => {
  const { store } = props;

  return (
    <div
      className={`${styles.content} ${store.isOpenActionsGame ? styles.content_active : ""}`}
    >
      <CSSTransition
        in={store.isOpenGameInfo.open}
        timeout={500}
        classNames="fade-out"
        unmountOnExit
      >
        <EditorGame info={store.isOpenGameInfo} />
      </CSSTransition>

      <CSSTransition
        in={store.isOpenAddForm}
        timeout={500}
        classNames="fade-out"
        unmountOnExit
      >
        <AddedGame />
      </CSSTransition>
    </div>
  );
});
