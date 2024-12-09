import React, { useContext, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { AddStore } from "../../../../../common/stores/addStore";
import { RootStoreContext } from "../../../../../pages/_app";

export const AddedGameFormMarkup = observer(() => {
  const inputRef = useRef(null);
  const { addStore } = useContext(RootStoreContext);

  const saveMarkup = (title: string) => {
    addStore.changeMarkup(
      Number(inputRef.current.value) === 0
        ? null
        : Number(inputRef.current.value),
      title,
    );
  };

  const checkNumberInInput = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value.replace(/^\s+|\s+$|\D/g, "");
    inputRef.current.value = newValue;
  };

  const getActiveEdition = () => {
    const activeEdition = addStore.secondPageAddForm.find((el) => el.active);
    return activeEdition?.titleEdition;
  };

  const getActiveStore = () => {
    const activeStore = addStore.secondPageAddForm
      .find((el) => el.active)
      ?.stores.find((store) => store.active);
    return activeStore;
  };

  const activeStore = getActiveStore();
  const activeEdition = getActiveEdition();

  const checkInputForPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    const newValue = inputRef.current.value + text.replace(/^\s+|\s+$|\D/g, "");

    inputRef.current.value = newValue;
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = activeStore?.markup;
    }
  }, [activeEdition]);

  return (
    <div className={styles.container}>
      {addStore.secondPageAddForm.map((el) => {
        if (el.active) {
          return el.stores.map((store) => {
            if (store.active) {
              return (
                <>
                  <label className={styles.title} htmlFor="markup">
                    Наценка
                  </label>
                  <input
                    ref={inputRef}
                    onBlur={() => saveMarkup(store.titleStore)}
                    onInput={(e) => checkNumberInInput(e)}
                    onPaste={checkInputForPaste}
                    className={styles.input}
                    type="text"
                    name="markup"
                    id="markup"
                    placeholder="Введите целое число процентов"
                    defaultValue={store.markup}
                  />
                </>
              );
            }

            return "";
          });
        }
        return "";
      })}
    </div>
  );
});
