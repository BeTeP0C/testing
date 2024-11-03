import React, { useState } from "react";
import styles from "./styles.module.scss"

export function AddedGameFormFullDescr (props: {setFullDescr: React.Dispatch<any>}) {
  const {setFullDescr} = props
  const [amountSymbol, setAmountSymbol] = useState(0)

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (amountSymbol <= 500) {
      setAmountSymbol(e.currentTarget.value.length)
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.title} htmlFor="full">Полное описание</label>

      <div className={styles.content}>
        <textarea onChange={(e) => handleChangeInput(e)} maxLength={500} className={styles.input} name="full"  placeholder="Введите полное описание товара..."></textarea>
        <span className={styles.counter}>{amountSymbol}/500</span>
      </div>
    </div>
  )
}
