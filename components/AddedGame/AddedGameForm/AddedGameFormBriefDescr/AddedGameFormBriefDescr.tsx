import React, { useRef, useState } from "react";
import styles from "./styles.module.scss"
import { TEditionsOptions } from "../../../../types/edtitionInfo";

export function AddedGameFormBriefDescr (props: {editionsOptions: TEditionsOptions[], setEditionOptions: React.Dispatch<React.SetStateAction<any[]>>}) {
  const {editionsOptions, setEditionOptions} = props
  const inputRef = useRef(null)

  const [amountSymbol, setAmountSymbol] = useState(0)

  const saveInput = (e: React.FocusEvent<HTMLInputElement, Element> ) => {
    setEditionOptions(editionsOptions.map(el => {
      if (el.active) {
        return {...el, regions: el.regions.map(region => {

          if (region.region === editionsOptions.find(el => el.active)?.regions.find(el => el.active)?.region) {
            return {...region, briefDescr: inputRef.current.value}
          } else {
            return {...region}
          }
        })}
      } else {
        return {...el}
      }
    }))
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (amountSymbol <= 100) {
      setAmountSymbol(inputRef.current.value.length)
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.title} htmlFor="brief">Краткое описание</label>

      <div className={styles.content}>
        {editionsOptions.find(el => el.active)?.regions.map(el => {
          return (
            <>
              {el.active ? (
                <input
                ref={inputRef}
                onChange={(e) => handleChangeInput(e)}
                onBlur={(e) => saveInput(e)}
                maxLength={100}
                className={styles.input}
                type="text"
                name="brief"
                placeholder="Введите краткое описание товара..."
                defaultValue={el.briefDescr}
                />
              ): ""}
              <span className={styles.counter}>{amountSymbol}/100</span>
            </>
          )
        })}
      </div>
    </div>
  )
}
