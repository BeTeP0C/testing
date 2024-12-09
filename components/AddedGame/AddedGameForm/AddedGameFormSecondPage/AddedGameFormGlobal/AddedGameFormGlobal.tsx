import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddStore } from "../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../pages/_app";

export const AddedGameFormGlobal = observer(() => {
  const { addStore } = useContext(RootStoreContext);

  return (
    <div className={styles.container}>
      {addStore.secondPageAddForm.map((el) => {
        if (el.active) {
          return el.stores.map((store) => {
            return store.regions.map((region) => {
              if (region.active) {
                return (
                  <>
                    <input
                      onChange={(e) =>
                        addStore.changeGlobalActive(region.titleRegion)
                      }
                      className={styles.input}
                      type="checkbox"
                      id="global"
                      name="global"
                      checked={region.isGlobal}
                    />
                    <label className={styles.global} htmlFor="global">
                      Глобальный шаблон
                    </label>
                  </>
                );
              }
              return "";
            });
          });
        }
        return "";
      })}
    </div>
  );
});
