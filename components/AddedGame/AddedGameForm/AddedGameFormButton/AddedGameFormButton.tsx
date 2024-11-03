import React from "react";
import styles from "./styles.module.scss"

export function AddedGameFormButton (props: {setIsNextStep: React.Dispatch<React.SetStateAction<boolean>>}) {
  const {setIsNextStep} = props
  const toNext = () => {
    setIsNextStep(true)
  }

  return (
    <div className={styles.container}>
      <button onClick={() => toNext()} className={styles.button}>Далее</button>
    </div>
  )
}
