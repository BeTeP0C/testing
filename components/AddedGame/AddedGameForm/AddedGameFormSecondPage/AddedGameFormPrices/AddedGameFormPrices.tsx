import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddStore } from "../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../pages/_app";
import { countryData } from "../../../../../common/transformCountriesForSettings";

export const AddedGameFormPrices = observer(() => {
  const { addStore } = useContext(RootStoreContext);

  return (
    <div className={styles.container}>
      {addStore.secondPageAddForm.map((el) => {
        if (el.active) {
          return el.stores.map((store) => {
            if (store.active) {
              return store.regions.map((region) => {
                if (region.active) {
                  return (
                    <>
                      <div className={styles.not_markup}>
                        <h3 className={styles.title}>Стоимость без наценки</h3>
                        <span className={styles.price}>
                          {Math.floor((region.price / 100) * 100) / 100}{" "}
                          {countryData[region.titleRegion].currenten}.
                        </span>
                      </div>
                      <div className={styles.with_markup}>
                        <h3 className={styles.title}>Стоимость с наценкой</h3>
                        <span className={styles.price}>
                          {Math.floor(
                            (region.price / 100) *
                              (1 + store.markup / 100) *
                              100,
                          ) / 100}{" "}
                          {countryData[region.titleRegion].currenten}.
                        </span>
                      </div>
                    </>
                  );
                }
                return "";
              });
            }
            return "";
          });
        }
        return "";
      })}
    </div>
  );
});
