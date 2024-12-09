import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddedGameFormInputId } from "../AddedGameFormInputId";
import { AddedGameFormInfo } from "../AddedGameFormInfo";

export const AddedGameFormSearch = observer(() => {
  return (
    <div className={styles.container}>
      <AddedGameFormInputId />
      <AddedGameFormInfo />
    </div>
  );
});
