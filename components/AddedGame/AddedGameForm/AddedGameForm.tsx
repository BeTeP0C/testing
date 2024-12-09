import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

type TAddedGameForm = {
  children: React.ReactNode;
};

export const AddedGameForm = observer(({ children }: TAddedGameForm) => {
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      {children}
    </form>
  );
});
