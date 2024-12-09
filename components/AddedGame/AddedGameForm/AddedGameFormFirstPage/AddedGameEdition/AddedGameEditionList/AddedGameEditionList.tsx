import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddedGameEditionItem } from "../AddedGameEditionItem";
import { TGameEdition } from "../../../../../../types/addGame";

export const AddedGameEditionList = observer(
  (props: {
    editions: TGameEdition[];
    type?: string;
    addPack: (id: number) => void;
    deletePack: (id: number) => void;
  }) => {
    const { editions, type = "choice", addPack, deletePack } = props;
    return (
      <ul className={styles.editions}>
        {editions.map((el) => (
          <AddedGameEditionItem
            key={el.id}
            edition={el}
            type={type}
            funcs={{ addPack, deletePack }}
          />
        ))}
      </ul>
    );
  },
);
