import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddedGameEditionList } from "../AddedGameEditionList";
import { StoreContext } from "../../../../MainPage";

type TAddedGameEditionChoice = {
  packages: {
    title: string;
    countries: string[];
    id: string;
  }[];
  funcs: {
    addPack: (id: string) => void;
    deletePack: (id: string) => void;
  };
};

export const AddedGameEditionChoice = observer(
  ({ packages, funcs }: TAddedGameEditionChoice) => {
    const store = useContext(StoreContext);

    return (
      <div className={styles.container}>
        {store.isSearchGame ? (
          <AddedGameEditionList editions={packages} funcs={funcs} />
        ) : (
          ""
        )}
      </div>
    );
  },
);
