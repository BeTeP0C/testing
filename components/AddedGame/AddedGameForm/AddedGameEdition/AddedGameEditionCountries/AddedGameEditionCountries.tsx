import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.scss";
import { AddedGameEditionCountry } from "./AddedGameEditionCountry";

export function AddedGameEditionCountries(props: { countries: string[] }) {
  const { countries } = props;

  return (
    <ul className={styles.list}>
      {countries.map((el) => (
        <AddedGameEditionCountry key={uuidv4()} country={el} />
      ))}
    </ul>
  );
}
