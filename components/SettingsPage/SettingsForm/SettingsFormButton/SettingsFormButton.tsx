import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { GlobalStore } from "../../../../common/stores/globalStore";
import { RootStoreContext } from "../../../../pages/_app";

type TSettingsFormButton = {
  titleStore: string;
  funpayKey: string;
  countriesSelect: {
    title: string;
    usename: string;
    id: number;
  }[];
};

export const SettingsFormButton = observer((props: TSettingsFormButton) => {
  const { globalStore } = useContext(RootStoreContext);

  const { titleStore, funpayKey, countriesSelect } = props;

  return (
    <button
      type="button"
      onClick={() =>
        globalStore.saveUserProfile(titleStore, funpayKey, countriesSelect)
      }
      className={styles.button}
    >
      Сохранить{" "}
      {globalStore.isSuccessfullySaveProfile === "alive"
        ? "Успешно сохранено"
        : globalStore.isSuccessfullySaveProfile === "loading"
          ? "Сохраняем..."
          : ""}
    </button>
  );
});
