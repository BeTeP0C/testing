import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddedGameFormTitleEdition } from "./AddedGameFormTitleEdition";
import { AddedGameFormStores } from "./AddedGameFormStores";
import { AddedGameFormRegions } from "./AddedGameFormRegions";
import { AddedGameFormGlobal } from "./AddedGameFormGlobal";
import { AddedGameFormMarkup } from "./AddedGameFormMarkup";
import { AddedGameFormBriefDescr } from "./AddedGameFormBriefDescr";
import { AddedGameFormFullDescr } from "./AddedGameFormFullDescr";
import { AddedGameFormPrices } from "./AddedGameFormPrices";
import { AddedGameFormSecondFunctionals } from "./AddedGameFormSecondFunctionals";

type TAddedGameFormSecondPage = {
  secondRef: React.MutableRefObject<HTMLDivElement | null>;
  numberStep: number;
};

export const AddedGameFormSecondPage = observer(
  ({ secondRef, numberStep }: TAddedGameFormSecondPage) => {
    return (
      <div
        ref={secondRef}
        className={`${styles.second_block} ${numberStep === 2 ? styles.second_block_active : ""}`}
      >
        <AddedGameFormTitleEdition />
        <AddedGameFormStores />
        <AddedGameFormRegions />
        <AddedGameFormGlobal />
        <AddedGameFormMarkup />
        <AddedGameFormBriefDescr />
        <AddedGameFormFullDescr />
        <AddedGameFormPrices />
        <AddedGameFormSecondFunctionals />
      </div>
    );
  },
);
