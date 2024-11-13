import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.scss";
import { Russia } from "../../../Icons/CoutryFlags/Russia";
import { Kazahstan } from "../../../Icons/CoutryFlags/Kazahstan";
import { Ukraine } from "../../../Icons/CoutryFlags/Ukraine";
import { Belarus } from "../../../Icons/CoutryFlags/Belarus";
import { USA } from "../../../Icons/CoutryFlags/USA";
import { TEditionsOptions } from "../../../../types/edtitionInfo";

export function AddedGameFormRegion(props: {
  editionsOptions: TEditionsOptions[];
  setEditionOptions: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const { editionsOptions, setEditionOptions } = props;

  const changeRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditionOptions(
      editionsOptions.map((el) => {
        if (el.active) {
          return {
            ...el,
            regions: el.regions.map((region) => {
              if (region.region === e.currentTarget.value) {
                return { ...region, active: true };
              }
              return { ...region, active: false };
            }),
          };
        }
        return { ...el };
      }),
    );
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Регионы</h3>

      <ul className={styles.list}>
        {editionsOptions
          .find((el) => el.active)
          ?.regions.map((region) => (
            <li key={uuidv4()} className={styles.item}>
              <input
                onChange={(e) => changeRegion(e)}
                type="radio"
                className={styles.input}
                name="region"
                id={`region-${region.region}`}
                value={region.region}
                checked={!!region.active}
              />
              <label
                className={styles.region}
                htmlFor={`region-${region.region}`}
              >
                {(() => {
                  switch (region.region) {
                    case "ru":
                      return <Russia />;
                    case "kz":
                      return <Kazahstan />;
                    case "ua":
                      return <Ukraine />;
                    case "by":
                      return <Belarus />;
                    case "us":
                      return <USA />;
                    default:
                      return "";
                  }
                })()}

                {region.region}
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
}
