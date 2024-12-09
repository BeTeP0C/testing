import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { usenameToCountries } from "../../../../common/countriesToUsename";
import { Russia } from "../../../Icons/CoutryFlags/Russia";
import { Ukraine } from "../../../Icons/CoutryFlags/Ukraine";
import { Kazahstan } from "../../../Icons/CoutryFlags/Kazahstan";
import { Belarus } from "../../../Icons/CoutryFlags/Belarus";
import { USA } from "../../../Icons/CoutryFlags/USA";
import { TFunPaySubItem } from "../../../../types/global";
import { TableStore } from "../../../../common/stores/tableStore";
import { RootStoreContext } from "../../../../pages/_app";
import { countryData } from "../../../../common/transformCountriesForSettings";

type TTableInfoFunpayItem = {
  funpayItem: TFunPaySubItem;
  title: string;
  editRef: React.MutableRefObject<HTMLDivElement>;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TableInfoFunpayItem = observer(
  ({ funpayItem, title, editRef, setIsAnimating }: TTableInfoFunpayItem) => {
    const { tableStore } = useContext(RootStoreContext);

    const handleItemClick = () => {
      if (funpayItem.active) {
        setIsAnimating(false);
        tableStore.setHeight(editRef.current?.offsetHeight);
        setTimeout(() => {
          tableStore.handleOpenCountry(
            funpayItem.country,
            editRef.current?.offsetHeight,
          );
        }, 500);
      } else {
        setIsAnimating(true);
        tableStore.handleOpenCountry(
          funpayItem.country,
          editRef.current?.offsetHeight,
        );
      }
    };

    return (
      <li className={styles.item}>
        <div className={styles.title_region}>
          <button
            type="button"
            onClick={handleItemClick}
            className={`${styles.button_region} ${funpayItem.active ? styles.button_region_active : ""}`}
          >
            <span className={styles.region}>
              {(() => {
                switch (usenameToCountries[funpayItem.country]) {
                  case "ru":
                    return <Russia width={21} height={16} />;
                  case "ua":
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
            <span className={styles.prices}>
              {Math.round(funpayItem.price * 100) / 100} RUB
            </span>
          </button>
        </div>
      </li>
    );
  },
);
