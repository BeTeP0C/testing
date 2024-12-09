import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { SettingsForm } from "./SettingsForm";
import { SettingsFormInputStore } from "./SettingsForm/SettingsFormInputStore";
import { SettingsFormInputKey } from "./SettingsForm/SettingsFormInputKey";
import { SettingsFormInputCountries } from "./SettingsForm/SettingsFormInputCountries";
import { SettingsFormButton } from "./SettingsForm/SettingsFormButton";
import { GlobalStore } from "../../common/stores/globalStore";
import { RootStoreContext } from "../../pages/_app";

export const SettingsPage = observer(() => {
  const { globalStore } = useContext(RootStoreContext);

  const [countriesSelect, setCountriesSelect] = useState(
    globalStore.userProfile.countries,
  );

  const [countriesChoice, setCountriesChoice] = useState(
    globalStore.settingsCountriesChoice,
  );

  const [titleStore, setTitleStore] = useState<string | null>(
    globalStore.userProfile.storeName,
  );
  const [funpayKey, setFunpayKey] = useState<string>(
    globalStore.userProfile.funPayGoldenKey,
  );

  const addPack = (id: number) => {
    setCountriesSelect([
      ...countriesSelect,
      countriesChoice.find((el) => el.id === id),
    ]);
    setCountriesChoice(countriesChoice.filter((el) => el.id !== id));
  };

  const deletePack = (id: number) => {
    setCountriesChoice([
      ...countriesChoice,
      countriesSelect.find((el) => el.id === id),
    ]);
    setCountriesSelect(countriesSelect.filter((el) => el.id !== id));
  };

  return (
    <div className={styles.container}>
      <SettingsForm>
        <SettingsFormInputStore
          titleStore={titleStore}
          setTitleStore={setTitleStore}
        />
        <SettingsFormInputKey
          funpayKey={funpayKey}
          setFunpayKey={setFunpayKey}
          activate={globalStore.isStateFunPay}
        />
        <SettingsFormInputCountries
          countriesChoice={countriesChoice}
          countriesSelect={countriesSelect}
          funcs={{ addPack, deletePack }}
        />
        <SettingsFormButton
          titleStore={titleStore}
          funpayKey={funpayKey}
          countriesSelect={countriesSelect}
        />
      </SettingsForm>
    </div>
  );
});
