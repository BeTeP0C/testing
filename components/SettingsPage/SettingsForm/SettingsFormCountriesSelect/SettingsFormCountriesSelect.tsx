import React from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { SettingsFormCountriesList } from "../SettingsFormCountriesList";

type TSettingsFormCountriesSelect = {
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

export const SettingsFormCountriesSelect = observer(
  ({ countries, funcs }: TSettingsFormCountriesSelect) => {
    return (
      <div
        className={`${styles.container} ${countries.length !== 0 ? styles.container_active : ""}`}
      >
        <SettingsFormCountriesList
          countries={countries}
          funcs={funcs}
          type="select"
        />
      </div>
    );
  },
);
