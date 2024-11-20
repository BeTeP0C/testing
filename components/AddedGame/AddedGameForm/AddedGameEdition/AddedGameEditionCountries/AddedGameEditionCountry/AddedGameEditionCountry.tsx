import React from "react";
import styles from "./styles.module.scss";
import { Russia } from "../../../../../Icons/CoutryFlags/Russia";
import { Ukraine } from "../../../../../Icons/CoutryFlags/Ukraine";
import { USA } from "../../../../../Icons/CoutryFlags/USA";
import { Belarus } from "../../../../../Icons/CoutryFlags/Belarus";
import { Kazahstan } from "../../../../../Icons/CoutryFlags/Kazahstan";

export function AddedGameEditionCountry(props: { country: string }) {
  const { country } = props;

  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        {(() => {
          switch (country) {
            case "ru":
              return <Russia width={10} height={12} />;
            case "ua":
              return <Ukraine width={10} height={12} />;
            case "kz":
              return <Kazahstan width={10} height={12} />;
            case "by":
              return <Belarus width={10} height={12} />;
            case "us":
              return <USA width={10} height={12} />;
            default:
              return "";
          }
        })()}
      </span>

      {country}
    </li>
  );
}
