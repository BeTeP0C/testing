import React from "react";
import styles from "./styles.module.scss"

type TAddedGameForm = {
  children: React.ReactNode
}

export function AddedGameForm ({children}: TAddedGameForm) {
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      {children}
    </form>
  )
}
