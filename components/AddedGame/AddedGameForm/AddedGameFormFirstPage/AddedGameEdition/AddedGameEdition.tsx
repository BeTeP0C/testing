import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddedGameEditionSelect } from "./AddedGameEditionSelect";
import { AddedGameEditionChoice } from "./AddedGameEditionChoice";

export const AddedGameEdition = observer(() => {
  return (
    <div className={styles.container}>
      <AddedGameEditionSelect />
      <AddedGameEditionChoice />
    </div>
  );
});
