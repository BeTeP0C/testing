import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { SettingsFormCountriesChoice } from "../SettingsFormCountriesChoice";
import { SettingsFormCountriesSelect } from "../SettingsFormCountriesSelect";

type TSettingsFormInputCountries = {
  countriesChoice: {
    title: string;
    usename: string;
    id: number;
  }[];
  countriesSelect: {
    title: string;
    usename: string;
    id: number;
  }[];
  funcs: {
    addPack: (id: number) => void;
    deletePack: (id: number) => void;
  };
};

export const SettingsFormInputCountries = observer(
  ({
    countriesChoice,
    countriesSelect,
    funcs,
  }: TSettingsFormInputCountries) => {
    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>Страны для торговли</h3>

        <div className={styles.content}>
          <SettingsFormCountriesSelect
            countries={countriesSelect}
            funcs={funcs}
          />
          <SettingsFormCountriesChoice
            countries={countriesChoice}
            funcs={funcs}
          />
        </div>
      </div>
    );
  },
);
