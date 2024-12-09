import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddedGameEditionCountries } from "../AddedGameEditionCountries";
import { TGameEdition } from "../../../../../../types/addGame";

type TAddedGameEditionItem = {
  edition: TGameEdition;
  type?: string;
  funcs: {
    addPack: (id: number) => void;
    deletePack: (id: number) => void;
  };
};

export const AddedGameEditionItem = observer(
  ({ edition, type = "choice", funcs }: TAddedGameEditionItem) => {
    return (
      <li
        className={`${styles.edition} ${type === "select" ? styles.edition_select : ""}`}
      >
        <h4 className={styles.heading}>{edition.title}</h4>
        <AddedGameEditionCountries
          countries={edition.countries.map((el) => el.country)}
        />

        {(() => {
          switch (type) {
            case "select":
              return (
                <button
                  onClick={() => funcs.deletePack(edition.id)}
                  className={styles.delete}
                  type="button"
                />
              );
            case "choice":
              return (
                <button
                  onClick={() => funcs.addPack(edition.id)}
                  className={styles.select}
                  type="button"
                />
              );
            default:
              return "";
          }
        })()}
      </li>
    );
  },
);
