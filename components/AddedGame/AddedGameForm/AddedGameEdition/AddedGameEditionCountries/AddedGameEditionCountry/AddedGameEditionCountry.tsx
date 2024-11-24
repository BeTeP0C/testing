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
              return <Russia width={14} height={16} />;
            case "ua":
              return <Ukraine width={14} height={16} />;
            case "kz":
              return <Kazahstan width={14} height={16} />;
            case "by":
              return <Belarus width={14} height={16} />;
            case "us":
              return <USA width={14} height={16} />;
            default:
              return "";
          }
        })()}
      </span>

      {country}
    </li>
  );
}
