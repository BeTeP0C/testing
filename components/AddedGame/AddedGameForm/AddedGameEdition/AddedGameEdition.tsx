import React from "react";
import styles from "./styles.module.scss";
import { AddedGameEditionSelect } from "./AddedGameEditionSelect";
import { AddedGameEditionChoice } from "./AddedGameEditionChoice";
import { TGameError } from "../../../../types/tgames";

type TAddedGameEdition = {
  packagesChoice: {
    title: string;
    countries: string[];
    id: string;
  }[];
  packagesSelect: {
    title: string;
    countries: string[];
    id: string;
  }[];
  funcs: {
    addPack: (id: string) => void;
    deletePack: (id: string) => void;
  };
  editionError: TGameError;
};

export function AddedGameEdition({
  packagesChoice,
  packagesSelect,
  funcs,
  editionError,
}: TAddedGameEdition) {
  return (
    <div className={styles.container}>
      <AddedGameEditionSelect
        editionError={editionError}
        packages={packagesSelect}
        funcs={funcs}
      />
      <AddedGameEditionChoice packages={packagesChoice} funcs={funcs} />
    </div>
  );
}
