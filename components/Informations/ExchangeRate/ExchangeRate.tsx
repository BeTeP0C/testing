import React from "react"
import styles from "./styles.module.scss"
import main_styles from '../informations.module.scss'
import { Ukraine } from "../../Icons/CoutryFlags/Ukraine"
import { Belarus } from "../../Icons/CoutryFlags/Belarus"
import { Kazahstan } from "../../Icons/CoutryFlags/Kazahstan"
import { USA } from "../../Icons/CoutryFlags/USA"

export function ExchangeRate () {
  return (
    <li className={main_styles.info + " " + styles.info}>
      <div className={styles.content}>
        <table className={styles.table}>
          <thead className={styles.header}>
            <tr>
              <th className={styles.heading}>Валюта</th>
              <th className={styles.heading}>Курс ЦБ</th>
              <th className={styles.heading}>Изменение</th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            <tr className={styles.row}>
              <td className={styles.cell}>
                <span className={styles.centering}>
                  <Ukraine />
                  <span className={styles.valut}>Украинская гривна</span>
                </span>
              </td>
              <td className={styles.cell + " " + styles.cell_course}>
                2,09 ₽
              </td>
              <td className={styles.cell + " " + styles.cell_positive + " " + styles.cell_update}>
                +0,03
              </td>
            </tr>
            <tr className={styles.row}>
              <td className={styles.cell}>
                <span className={styles.centering}>
                  <Belarus />
                  <span className={styles.valut}>Белорусский рубль</span>
                </span>
              </td>
              <td className={styles.cell + " " + styles.cell_course}>
                27,72 ₽
              </td>
              <td className={styles.cell + " " + styles.cell_negative + " " + styles.cell_update}>
                -0,05
              </td>
            </tr>
            <tr className={styles.row}>
              <td className={styles.cell}>
                <span className={styles.centering}>
                  <Kazahstan />
                  <span className={styles.valut}>Казахстанский тенге</span>
                </span>
              </td>
              <td className={styles.cell + " " + styles.cell_course}>
                0,18 ₽
              </td>
              <td className={styles.cell + " " + styles.cell_positive + " " + styles.cell_update}>
                +0,03
              </td>
            </tr>
            <tr className={styles.row}>
              <td className={styles.cell}>
                <span className={styles.centering}>
                  <USA />
                  <span className={styles.valut}>Доллар США</span>
                </span>
              </td>
              <td className={styles.cell + " " + styles.cell_course}>
                85,95 ₽
              </td>
              <td className={styles.cell + " " + styles.cell_negative + " " + styles.cell_update}>
                -2,14
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <span className={styles.bg}></span>
    </li>
  )
}
