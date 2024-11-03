import React, { useState } from "react";
import styles from "./styles.module.scss"

export function AddedGameFormBriefDescr (props: {setBriefDescr: React.Dispatch<any>}) {
  const {setBriefDescr} = props

  const [amountSymbol, setAmountSymbol] = useState(0)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (amountSymbol <= 100) {
      setAmountSymbol(e.currentTarget.value.length)
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.title} htmlFor="brief">Краткое описание</label>

      <div className={styles.content}>
        <input onChange={(e) => handleChangeInput(e)} maxLength={100} className={styles.input} type="text" name="brief" placeholder="Введите краткое описание товара..."/>
        <span className={styles.counter}>{amountSymbol}/100</span>
      </div>
    </div>
  )
}
