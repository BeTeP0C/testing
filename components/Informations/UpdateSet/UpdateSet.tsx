import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import mainStyles from "../informations.module.scss";
import { RootStoreContext } from "../../../pages/_app";

export const UpdateSet = observer(() => {
  const {globalStore} = useContext(RootStoreContext)

  return (
    <li className={`${mainStyles.info} ${styles.info}`}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Обновите настройки</h2>

        <ul className={styles.list}>
          {globalStore.userProfile.funPayGoldenKey ? (
            ""
          ) : (
            <li className={styles.item}>- Введите ключ для FunPay;</li>
          )}
          {globalStore.userProfile.countries.length === 0 ? (
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
