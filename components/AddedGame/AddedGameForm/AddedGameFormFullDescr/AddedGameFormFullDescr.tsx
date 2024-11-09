import React, { useRef, useState } from "react";
import styles from "./styles.module.scss"
import { TEditionsOptions } from "../../../../types/edtitionInfo";

export function AddedGameFormFullDescr (props: {editionsOptions: TEditionsOptions[], setEditionOptions: React.Dispatch<React.SetStateAction<any[]>>}) {
  const {editionsOptions, setEditionOptions} = props
  const inputRef = useRef(null)
  const [amountSymbol, setAmountSymbol] = useState(0)

  const saveInput = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    setEditionOptions(editionsOptions.map(el => {
      if (el.active) {
        return {...el, regions: el.regions.map(region => {

          if (region.region === editionsOptions.find(el => el.active)?.regions.find(el => el.active)?.region) {
            return {...region, fullDescr: inputRef.current.value}
          } else {
            return {...region}
          }
        })}
      } else {
        return {...el}
      }
    }))
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (amountSymbol <= 500) {
      setAmountSymbol(e.currentTarget.value.length)
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.title} htmlFor="full">Полное описание</label>

      <div className={styles.content}>
      {editionsOptions.find(el => el.active)?.regions.map(el => {
          return (
            <>
              {el.active ? (
                <textarea
                  ref={inputRef}
                  onChange={(e) => handleChangeInput(e)}
                  onBlur={(e) => saveInput(e)}
                  maxLength={500}
                  className={styles.input}
                  name="full"
                  placeholder="Введите полное описание товара..."
                  defaultValue={el.fullDescr}
                ></textarea>
              ): ""}
              <span className={styles.counter}>{amountSymbol}/500</span>
            </>
          )
        })}
      </div>
    </div>
  )
}
