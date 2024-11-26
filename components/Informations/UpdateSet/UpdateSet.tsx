import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import mainStyles from "../informations.module.scss";
import { MagazineStore } from "../../../common/store";
import { StoreContext } from "../../MainPage";

export const UpdateSet = observer(() => {
  const store: MagazineStore = useContext(StoreContext);

  return (
    <li className={`${mainStyles.info} ${styles.info}`}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Обновите настройки</h2>

        <ul className={styles.list}>
          {store.settingsData.funpayActivate ? (
            ""
          ) : (
            <li className={styles.item}>- Введите ключ для FunPay;</li>
          )}
          {store.settingsData.countries.length === 0 ? (
            <li className={styles.item}>
              - Введите список стран с которыми вы работаете;
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>

      <span className={styles.bg} />
    </li>
  );
});
