import React from "react";
import styles from "./styles.module.scss";
import { Ukraine } from "../../../../Icons/CoutryFlags/Ukraine";
import { Belarus } from "../../../../Icons/CoutryFlags/Belarus";
import { Russia } from "../../../../Icons/CoutryFlags/Russia";
import { Kazahstan } from "../../../../Icons/CoutryFlags/Kazahstan";
import { TGameInfoHug } from "../../../../../types/tgames";

export function TableInfoHug(props: { hug: TGameInfoHug }) {
  const { hug } = props;

  return (
    <li className={styles.row}>
      <ul className={styles.cells}>
        <li className={`${styles.cell} ${styles.centering}`}>
          {(() => {
            switch (hug.currency) {
              case "RU":
                return <Russia />;
              case "BY":
                return <Belarus />;
              case "UA":
                return <Ukraine />;
              case "KZ":
                return <Kazahstan />;
              default:
                return "";
            }
          })()}

          {hug.currency}
        </li>
        <li className={styles.cell}>{hug.title}</li>
        <li className={styles.cell}>{hug.price}</li>
      </ul>
    </li>
  );
}
