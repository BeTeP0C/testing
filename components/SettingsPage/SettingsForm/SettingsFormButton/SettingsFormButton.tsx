import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { StoreContext } from "../../../MainPage";

type TSettingsFormButton = {
  titleStore: string;
  funpayKey: string;
  countriesSelect: string[];
};

export const SettingsFormButton = observer((props: TSettingsFormButton) => {
  const store = useContext(StoreContext);
  const { titleStore, funpayKey, countriesSelect } = props;

  return (
    <button
      type="button"
      onClick={() =>
        store.handleSaveSettings(titleStore, funpayKey, countriesSelect)
      }
      className={styles.button}
    >
      Сохранить
    </button>
  );
});
