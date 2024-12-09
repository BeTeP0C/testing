import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { SettingsFormCountriesList } from "../SettingsFormCountriesList";

type TSettingsFormCountriesChoice = {
  countries: {
    title: string;
    usename: string;
    id: number;
  }[];
  funcs: {
    addPack: (id: number) => void;
    deletePack: (id: number) => void;
  };
};

export const SettingsFormCountriesChoice = observer(
  ({ countries, funcs }: TSettingsFormCountriesChoice) => {
    return (
      <div className={styles.container}>
        <SettingsFormCountriesList
          countries={countries}
          funcs={funcs}
          type="choice"
        />
      </div>
    );
  },
);
