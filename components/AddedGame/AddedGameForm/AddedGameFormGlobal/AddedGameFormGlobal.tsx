import React from "react";
import styles from "./styles.module.scss"

export function AddedGameFormGlobal (props: {setIsGlobal: React.Dispatch<React.SetStateAction<boolean>>}) {
  const {setIsGlobal} = props

  const handleCheckboxChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setIsGlobal(e.currentTarget.checked)
  }

  return (
    <div className={styles.container}>
      <input onChange={(e) => handleCheckboxChange(e)} className={styles.input} type="checkbox" id="global" name="global"/>
      <label className={styles.global} htmlFor="global">Глобальный шаблон</label>
    </div>
  )
}
