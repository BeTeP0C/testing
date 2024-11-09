import React from "react";
import styles from "./styles.module.scss"

export function SettingsForm (props: {children: React.ReactNode}) {
  const {children} = props

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
      {children}
    </form>
  )
}
