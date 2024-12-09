import React from "react";
import { v4 as uuidv4 } from "uuid";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddedGameEditionCountry } from "./AddedGameEditionCountry";

export const AddedGameEditionCountries = observer(
  (props: { countries: string[] }) => {
    const { countries } = props;

    return (
      <ul className={styles.list}>
        {countries.map((el) => (
          <AddedGameEditionCountry key={uuidv4()} country={el} />
        ))}
      </ul>
    );
  },
);
