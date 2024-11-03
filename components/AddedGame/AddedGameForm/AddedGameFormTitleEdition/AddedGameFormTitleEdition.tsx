import React from "react";
import styles from "./styles.module.scss"

export function AddedGameFormTitleEdition (props: {title: string}) {
  const {title} = props

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Издание</h3>
      <div className={styles.title}>{title}</div>
    </div>
  )
}
