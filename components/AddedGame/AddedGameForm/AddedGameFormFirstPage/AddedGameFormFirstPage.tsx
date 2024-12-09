import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddedGameInputTitle } from "./AddedGameInputTitle";
import { AddedGameFormSearch } from "./AddedGameFormSearch";
import { AddedGameEdition } from "./AddedGameEdition";
import { AddedGameFormButton } from "./AddedGameFormButton";

type TAddedGameFormFirstPage = {
  firstRef: React.MutableRefObject<HTMLDivElement | null>;
  numberStep: number;
};

export const AddedGameFormFirstPage = observer(
  ({ firstRef, numberStep }: TAddedGameFormFirstPage) => {
    return (
      <div
        ref={firstRef}
        className={`${styles.first_block} ${numberStep === 1 ? styles.first_block_active : ""}`}
      >
        <AddedGameInputTitle />
        <AddedGameFormSearch />
        <AddedGameEdition />
        <AddedGameFormButton />
      </div>
    );
  },
);
