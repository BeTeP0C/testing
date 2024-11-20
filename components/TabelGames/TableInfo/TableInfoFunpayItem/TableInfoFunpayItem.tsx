import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { usenameToCountries } from "../../../../common/countriesToUsename";
import { Russia } from "../../../Icons/CoutryFlags/Russia";
import { Ukraine } from "../../../Icons/CoutryFlags/Ukraine";
import { Kazahstan } from "../../../Icons/CoutryFlags/Kazahstan";
import { Belarus } from "../../../Icons/CoutryFlags/Belarus";
import { USA } from "../../../Icons/CoutryFlags/USA";

import { TFunPayItem, TFunPaySubItem } from "../../../../types/tgames";
import { StoreContext } from "../../../MainPage";
import { MagazineStore } from "../../../../common/store";

export const TableInfoFunpayItem = observer(
  (props: {
    funpayItem: TFunPaySubItem;
    title: string;
    item: React.MutableRefObject<any>;
  }) => {
    const { funpayItem, title, item } = props;
    const store: MagazineStore = useContext(StoreContext);

    return (
      <li className={styles.item}>
        <div className={styles.title_region}>
          <button
            type="button"
            onClick={(e) =>
              store.changeOpenGameStore(
                usenameToCountries[funpayItem.country],
                item.current ? item.current.offsetHeight : 0,
              )
            }
            className={`${styles.button_region}`}
          >
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
              <span className={styles.country}>
                {usenameToCountries[funpayItem.country]}
              </span>
            </span>
            <span className={styles.title}>{title}</span>
            <span className={styles.prices}>{funpayItem.price} RUB</span>
          </button>
        </div>
      </li>
    );
  },
);
