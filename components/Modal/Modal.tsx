import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { GlobalStore } from "../../common/stores/globalStore";
import { RootStoreContext } from "../../pages/_app";

type TModal = {
  children: React.ReactNode;
};

export const Modal = observer(({ children }: TModal) => {
  const { globalStore } = useContext(RootStoreContext);

  return (
    <div
      className={`${styles.modal} ${globalStore.isOpenModal ? styles.modal_active : ""}`}
    >
      {children}
    </div>
  );
});
