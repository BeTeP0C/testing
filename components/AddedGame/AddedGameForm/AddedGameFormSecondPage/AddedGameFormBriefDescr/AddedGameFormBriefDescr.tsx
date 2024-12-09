import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddStore } from "../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../pages/_app";
import { ErrorsStore } from "../../../../../common/stores/errorsStore";

type TAddedGameFormBriefDescrStores = {
  addStore: AddStore;
  errorsStore: ErrorsStore;
};

export const AddedGameFormBriefDescr = observer(() => {
  const { addStore, errorsStore }: TAddedGameFormBriefDescrStores =
    useContext(RootStoreContext);

  const inputRef = useRef(null);
  const [amountSymbol, setAmountSymbol] = useState(
    inputRef.current ? inputRef.current.value.length : 0,
  );
  const [shortDescr, setShortDescr] = useState("");
  const [isShow, setIsShow] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (amountSymbol <= 100) {
      setShortDescr(e.currentTarget.value);
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

  const handleShowPrompt = () => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    if (inputRef.current) {
      setAmountSymbol(inputRef.current.value.length);
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      setShortDescr(activeRegion?.shortDescr);
      setAmountSymbol(activeRegion?.shortDescr.length);
    }
  }, [activeRegion, activeEdition]);

  return (
    <div className={styles.container}>
      <label className={styles.title} htmlFor="brief">
        Краткое описание
        {errorsStore.secondPageAddFormErrors.shortDescrError.active ? (
          <span className={styles.error}>
            {errorsStore.secondPageAddFormErrors.shortDescrError.message}
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
                        <input
                          ref={inputRef}
                          onChange={(e) => handleChangeInput(e)}
                          onBlur={(e) =>
                            addStore.changeShortDescr(inputRef.current.value)
                          }
                          maxLength={100}
                          className={styles.input}
                          type="text"
                          name="brief"
                          id="brief"
                          placeholder="Введите краткое описание товара..."
                          value={shortDescr}
                        />

                        <span className={styles.counter}>
                          {amountSymbol}/100
                        </span>
                        {region.isGlobal ? (
                          <button
                            className={styles.button}
                            onClick={() => handleShowPrompt()}
                            type="button"
                          />
                        ) : (
                          ""
                        )}
                        {isShow ? (
                          <span
                            className={`${styles.prompt} ${isShow ? styles.prompt_show : ""}`}
                          >
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
