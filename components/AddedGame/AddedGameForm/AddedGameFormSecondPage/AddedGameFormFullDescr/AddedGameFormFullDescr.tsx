import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import styles from "./styles.module.scss";
import { AddStore } from "../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../pages/_app";
import { ErrorsStore } from "../../../../../common/stores/errorsStore";

type TAddedGameFormFullDescrStores = {
  addStore: AddStore;
  errorsStore: ErrorsStore;
};

export const AddedGameFormFullDescr = observer(() => {
  const { addStore, errorsStore }: TAddedGameFormFullDescrStores =
    useContext(RootStoreContext);

  const inputRef = useRef(null);
  const [amountSymbol, setAmountSymbol] = useState(
    inputRef.current ? inputRef.current.value.length : 0,
  );
  const [fullDescr, setFullDescr] = useState("");
  const [isShow, setIsShow] = useState(false);

  const handleShowPrompt = () => {
    setIsShow(!isShow);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (amountSymbol <= 2000) {
      setFullDescr(e.currentTarget.value);
      setAmountSymbol(e.currentTarget.value.length);
    }
  };

  const getActiveRegionShortDescr = () => {
    const activeRegion = addStore.secondPageAddForm
      .find((el) => el.active)
      ?.stores.find((store) => store.active)
      ?.regions.find((region) => region.active);
    return activeRegion;
  };

  const getActiveEdition = () => {
    const activeEdition = addStore.secondPageAddForm.find((el) => el.active);
    return activeEdition?.titleEdition;
  };

  const activeRegion = getActiveRegionShortDescr();
  const activeEdition = getActiveEdition();

  useEffect(() => {
    if (inputRef.current) {
      setAmountSymbol(inputRef.current.value.length);
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      setFullDescr(activeRegion?.fullDescr);
      setAmountSymbol(activeRegion?.fullDescr.length);
    }
  }, [activeRegion, activeEdition]);

  return (
    <div className={styles.container}>
      <label className={styles.title} htmlFor="full">
        Полное описание
        {errorsStore.secondPageAddFormErrors.fullDescrError.active ? (
          <span className={styles.error}>
            {errorsStore.secondPageAddFormErrors.fullDescrError.message}
          </span>
        ) : (
          ""
        )}
      </label>

      <div className={styles.content}>
        {addStore.secondPageAddForm.map((el) => {
          if (el.active) {
            return el.stores.map((store) => {
              if (store.active) {
                return store.regions.map((region) => {
                  if (region.active) {
                    return (
                      <>
                        <textarea
                          ref={inputRef}
                          onChange={(e) => handleChangeInput(e)}
                          onBlur={(e) => addStore.changeFullDescr(fullDescr)}
                          maxLength={2000}
                          className={styles.input}
                          name="full"
                          id="full"
                          placeholder="Введите полное описание товара..."
                          value={fullDescr}
                          disabled={region.isGlobal}
                        />
                        <span className={styles.counter}>
                          {amountSymbol}/2000
                        </span>
                        {region.isGlobal ? (
                          <button
                            type="button"
                            className={styles.button}
                            onClick={() => handleShowPrompt()}
                          />
                        ) : (
                          ""
                        )}
                        {isShow ? (
                          <span className={`${styles.prompt}`}>
                            Ввод запрещен <br />
                            Отключите глобальный шаблон
                            <span className={`${styles.tail}`} />
                          </span>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  }
                  return "";
                });
              }
              ("");
            });
          }
          return "";
        })}
      </div>
    </div>
  );
});
