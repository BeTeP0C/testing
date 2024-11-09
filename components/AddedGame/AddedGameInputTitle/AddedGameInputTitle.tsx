import React, { useState } from "react";
import { TGameError } from "../../../types/tgames";
import styles from "./styles.module.scss"

type TAddedGameInputTitle = {
  title: string,
  titleError: TGameError,
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

export function AddedGameInputTitle ({title, titleError, setTitle}: TAddedGameInputTitle) {
  const [value, setValue] = useState(title)

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const changeTitle = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    <div className={styles.container}>
      <label className={styles.title} htmlFor="title">
        Название товара
        {titleError.activate ? <span className={styles.error}>{titleError.errorMessage}</span> : ""}
      </label>
      <input onChange={(e) => changeValue(e)} onBlur={(e) => changeTitle(e)} className={styles.input} type="text" name="title" value={value}/>
    </div>
  )
}
