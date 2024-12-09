import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { RootStoreContext } from "../../pages/_app";
import { GlobalStore } from "../../common/stores/globalStore";
import { AddStore } from "../../common/stores/addStore";
import { AddedGame } from "../AddedGame";

type TActionsOverGameStores = {
  globalStore: GlobalStore;
  addStore: AddStore;
};

export const ActionsOverGame = observer(() => {
  const { globalStore, addStore }: TActionsOverGameStores =
    useContext(RootStoreContext);

  return (
    <div
      className={`${styles.content} ${globalStore.isOpenActionsGame ? styles.content_active : ""}`}
    >
      <CSSTransition
        in={addStore.isOpenAddForm}
        timeout={500}
        classNames="fade-out"
        unmountOnExit
      >
        <AddedGame />
      </CSSTransition>
    </div>
  );
});
