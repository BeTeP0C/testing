import React from "react";
import styles from "./styles.module.scss"
import { usenameToCountries } from "../../../../common/countriesToUsename";
import { Russia } from "../../../Icons/CoutryFlags/Russia";
import { Ukraine } from "../../../Icons/CoutryFlags/Ukraine";
import { Kazahstan } from "../../../Icons/CoutryFlags/Kazahstan";
import { Belarus } from "../../../Icons/CoutryFlags/Belarus";
import { USA } from "../../../Icons/CoutryFlags/USA";

import { TFunPayItem } from "../../../../types/tgames";
import { TFunPaySubItem } from "../../../../types/tgames";

export function TableInfoFunpayItem (props: {funpayItem: TFunPaySubItem, title: string}) {
  const {funpayItem, title} = props

  return (
    <li className={styles.item}>
      <span className={styles.region}>
        {(() => {
          switch (usenameToCountries[funpayItem.country]) {
            case "ru":
              return <Russia width={21} height={16} />;
            case "uk":
              return <Ukraine width={21} height={16} />;
            case "kz":
              return <Kazahstan width={21} height={16} />;
            case "by":
              return <Belarus width={21} height={16} />;
            case "us":
              return <USA width={21} height={16} />;
            default:
              return "";
          }
        })()}
        <span className={styles.country}>{usenameToCountries[funpayItem.country]}</span>
      </span>
      <span className={styles.title}>{title}</span>
      <span className={styles.prices}>{funpayItem.price} RUB</span>
    </li>
  )
}
