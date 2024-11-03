import React, { useState } from "react";
import styles from "./styles.module.scss"
import { Russia } from "../../../Icons/CoutryFlags/Russia";
import { Kazahstan } from "../../../Icons/CoutryFlags/Kazahstan";
import { Ukraine } from "../../../Icons/CoutryFlags/Ukraine";
import { Belarus } from "../../../Icons/CoutryFlags/Belarus";

export function AddedGameFormRegion (props: {setRegion:  React.Dispatch<React.SetStateAction<string>>}) {
  const {setRegion} = props
  const [position, setPosition] = useState(0)

  const moveStrip = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    console.log("sdadsa")
    setPosition(e.currentTarget.offsetLeft)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Регионы</h3>

      <ul className={styles.list}>
        <li className={styles.item}>
          <input type="radio" className={styles.input} name="region" id="russia"/>
          <label onClick={moveStrip} className={styles.region} htmlFor="russia">
            <Russia />
            RU
          </label>
        </li>
        <li className={styles.item}>
          <input type="radio" className={styles.input} name="region" id="kazahstan"/>
          <label onClick={moveStrip} className={styles.region} htmlFor="kazahstan">
            <Kazahstan />
            KZ
          </label>
        </li>
        <li className={styles.item}>
          <input type="radio" className={styles.input} name="region" id="ukraine"/>
          <label onClick={moveStrip} className={styles.region} htmlFor="ukraine">
            <Ukraine />
            UA
          </label>
        </li>
        <li className={styles.item}>
          <input type="radio" className={styles.input} name="region" id="belarus"/>
          <label onClick={moveStrip} className={styles.region} htmlFor="belarus">
            <Belarus />
            BY
          </label>
        </li>

        <li className={styles.strip} style={{transform: `translateX(${position}px)`}}></li>
      </ul>
    </div>
  )
}
