import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.scss";
import { TGameInfoPackage } from "../../../../types/tgames";

export function TableInfoPackage(props: { packages: TGameInfoPackage[] }) {
  const { packages } = props;

  return (
    <div className={styles.content}>
      <h3 className={styles.heading}>Название Package</h3>

      <ul className={styles.list}>
        {packages.map((pack) => {
          return (
            <li
              key={uuidv4()}
              className={`${styles.item} ${pack.onSale ? styles.item_active : ""}`}
            >
              {pack.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
