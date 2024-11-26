import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { UpdateSet } from "../Informations/UpdateSet";
import { ExchangeRate } from "../Informations/ExchangeRate/ExchangeRate";
import { StoreContext } from "../MainPage";
import { MagazineStore } from "../../common/store";

export const MainInfo = observer((props: { funpayActivate: boolean }) => {
  const { funpayActivate } = props;
  const store: MagazineStore = useContext(StoreContext);

  return (
    <div className={styles.main}>
      <ul className={styles.list}>
        {store.settingsData.funpayActivate &&
        store.settingsData.countries.length !== 0 ? (
          ""
        ) : (
          <UpdateSet />
        )}
        <ExchangeRate />
      </ul>
    </div>
  );
});
