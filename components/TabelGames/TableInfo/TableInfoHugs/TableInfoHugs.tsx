import React from "react";
import styles from "./styles.module.scss"
import { v4 as uuidv4 } from "uuid";
import { TableInfoHug } from "./TableInfoHug/TableInfoHug";
import { TGameInfoHug } from "../../../../types/tgames";

export function TableInfoHugs (props: {hugs: TGameInfoHug[]}) {
  const {hugs} = props

  return (
    <ul className={styles.table}>
      {hugs.map((hug) => {
        return (
          <TableInfoHug key={uuidv4()} hug={hug}/>
        )
      })}
    </ul>
  )
}
