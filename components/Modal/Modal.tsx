import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { StoreContext } from "../MainPage";

type TModal = {
  children: React.ReactNode;
};

export const Modal = observer(({ children }: TModal) => {
  const store = useContext(StoreContext);

  return (
    <CSSTransition
      timeout={300}
      in={store.isOpenModal}
      classNames="drop-animation"
      unmountOnExit
    >
      <div
        className={`${styles.modal} ${store.isOpenModal ? styles.modal_active : ""}`}
      >
        {children}
      </div>
    </CSSTransition>
  );
});
