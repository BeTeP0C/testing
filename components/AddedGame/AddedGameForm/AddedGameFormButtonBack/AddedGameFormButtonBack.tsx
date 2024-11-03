import React from "react";
import styles from "./styles.module.scss"

export function AddedGameFormButtonBack (props: {setIsNextStep: React.Dispatch<React.SetStateAction<boolean>>}) {
  const {setIsNextStep} = props

  const toBack = () => {
    setIsNextStep(false)
  }

  return (
    <button onClick={() => toBack()} className={styles.button}>Назад</button>
  )
}
