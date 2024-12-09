import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { TFunPaySubItem } from "../../../../../types/global";
import { ErrorsStore } from "../../../../../common/stores/errorsStore";
import { RootStoreContext } from "../../../../../pages/_app";

type TTableInfoProductEditFull = {
  item: TFunPaySubItem;
  fullRef: React.MutableRefObject<HTMLTextAreaElement>;
  setFullValue: React.Dispatch<React.SetStateAction<string>>;
};

export const TableInfoProductEditFull = observer(
  ({ item, fullRef, setFullValue }: TTableInfoProductEditFull) => {
    const { errorsStore } = useContext(RootStoreContext);

    const [amountSymbol, setAmountSymbol] = useState(
      fullRef.current ? fullRef.current.value.length : 0,
    );

    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (amountSymbol <= 2000) {
        fullRef.current.value = e.currentTarget.value;
        setFullValue(fullRef.current.value);
        setAmountSymbol(fullRef.current.value.length);
      }
    };

    useEffect(() => {
      if (fullRef.current) {
        setFullValue(fullRef.current.value);
        setAmountSymbol(fullRef.current.value.length);
      }
    }, []);

    useEffect(() => {
      if (fullRef.current) {
        setFullValue(fullRef.current.value);
        setAmountSymbol(fullRef.current.value.length);
      }
    }, [item.active]);

    return (
      <div className={styles.full_descr}>
        <label htmlFor="edit_full_descr" className={styles.label}>
          Полное описание
          {errorsStore.editFormErrors.fullDescrError.active ? (
            <span className={styles.error}>
              {errorsStore.editFormErrors.fullDescrError.message}
            </span>
          ) : (
            ""
          )}
        </label>
        <div className={styles.text_container}>
          <textarea
            ref={fullRef}
            id="edit_full_descr"
            onChange={handleChangeText}
            className={styles.text}
            maxLength={500}
            defaultValue={item.countryInfo.longDescriptionRu}
            disabled={!item.countryInfo.isEdit}
          />
          <span className={`${styles.counter} ${styles.counter_text}`}>
            {amountSymbol}/2000
          </span>
        </div>
      </div>
    );
  },
);
