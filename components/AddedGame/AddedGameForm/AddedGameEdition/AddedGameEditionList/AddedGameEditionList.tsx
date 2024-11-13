import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.scss";
import { AddedGameEditionItem } from "../AddedGameEditionItem";

type TAddedGameEditionList = {
  title: string;
  countries: string[];
  id: string;
};

type TEditionFuncs = {
  addPack: (id: string) => void;
  deletePack: (id: string) => void;
};

export function AddedGameEditionList(props: {
  editions: TAddedGameEditionList[];
  type?: string;
  funcs: TEditionFuncs;
}) {
  const { editions, type = "choice", funcs } = props;
  return (
    <ul className={styles.editions}>
      {editions.map((el) => (
        <AddedGameEditionItem
          key={el.id}
          id={el.id}
          title={el.title}
          coutries={el.countries}
          type={type}
          funcs={funcs}
        />
      ))}
    </ul>
  );
}
