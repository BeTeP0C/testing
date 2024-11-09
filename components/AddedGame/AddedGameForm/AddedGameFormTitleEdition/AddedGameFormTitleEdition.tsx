import React, { useEffect } from "react";
import styles from "./styles.module.scss"
import {v4 as uuidv4} from "uuid"
import { TEditionsOptions } from "../../../../types/edtitionInfo";

export function AddedGameFormTitleEdition (props: {editionOptions: TEditionsOptions[] | any[], setEditionOptions: React.Dispatch<React.SetStateAction<any[]>>}) {
  const {editionOptions, setEditionOptions} = props

  const changeSelectTitle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditionOptions(editionOptions.map(el => {
      if (el.title === e.currentTarget.value) {
        return {...el, active: true, regions: el.regions.map(region => {
          return {...region, active: false}
        })}
      } else {
        return {...el, active: false, regions: el.regions.map(region => {
          return {...region, active: false}
        })}
      }
    }))
  }

  // useEffect (() => {
  //   setEditionOptions(editionOptions.map(el => {
  //     if (el.title === editionOptions[0].title) {
  //       return {...el, active: true}
  //     } else {
  //       return {...el, active: false}
  //     }
  //   }))
  // }, [editionOptions])

  return (
    <div className={styles.container}>
      <label htmlFor="editionTitle" className={styles.heading}>Издание</label>

      <select onChange={e => changeSelectTitle(e)} className={styles.title} name="" id="editionTitle">
        {editionOptions.length !== 0 ?
          editionOptions.map((el: TEditionsOptions) => (
            <option key={el.id} value={el.title}>{el.title}</option>
          )) : (
            <option value="">Нет изданий</option>
          )}
      </select>
    </div>
  )
}
