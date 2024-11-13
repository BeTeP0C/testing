import React from "react";
import styles from "./styles.module.scss";
import { TGameError } from "../../../../../types/tgames";
import { AddedGameEditionList } from "../AddedGameEditionList";

type TAddedGameEditionSelect = {
  packages: {
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

export function AddedGameEditionSelect({
  packages,
  funcs,
  editionError,
}: TAddedGameEditionSelect) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Издание
        {editionError.activate ? (
          <span className={styles.error}>{editionError.errorMessage}</span>
        ) : (
          ""
        )}
      </h3>

      <div className={styles.content}>
        <AddedGameEditionList editions={packages} type="select" funcs={funcs} />
      </div>
    </div>
  );
}
