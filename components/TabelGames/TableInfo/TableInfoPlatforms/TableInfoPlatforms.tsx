import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.scss";
import { TableInfoPlatform } from "./TableInfoPlatform/TableInfoPlatform";
import { TGameInfoStore } from "../../../../types/tgames";

export function TableInfoPlatforms(props: { platforms: TGameInfoStore[] }) {
  const { platforms } = props;

  return (
    <ul className={styles.platforms}>
      {platforms.map((store) => (
        <TableInfoPlatform
          key={uuidv4()}
          title={store.title}
          hugs={store.hugs}
        />
      ))}
    </ul>
  );
}
