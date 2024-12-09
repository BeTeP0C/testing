import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import styles from "./styles.module.scss";
import { TFunPaySubItem } from "../../../../../types/global";
import { ErrorsStore } from "../../../../../common/stores/errorsStore";
import { RootStoreContext } from "../../../../../pages/_app";

type TTableInfoProductEditBrief = {
  item: TFunPaySubItem;

  briefRef: React.MutableRefObject<HTMLInputElement>;
  setBriefValue: React.Dispatch<React.SetStateAction<string>>;
};

export const TableInfoProductEditBrief = observer(
  ({ item, briefRef, setBriefValue }: TTableInfoProductEditBrief) => {
    const { errorsStore } = useContext(RootStoreContext);
    const [amountSymbol, setAmountSymbol] = useState(
      briefRef.current ? briefRef.current.value.length : 0,
    );
    const [a, setA] = useState(0);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (amountSymbol <= 100) {
        setBriefValue(briefRef.current.value);
        setAmountSymbol(briefRef.current.value.length);
      }
    };

    useEffect(() => {
      if (briefRef.current) {
        setBriefValue(briefRef.current.value);
        setAmountSymbol(briefRef.current.value.length);
      }
    }, []);

    useEffect(() => {
      if (briefRef.current) {
        setBriefValue(briefRef.current.value);
        setAmountSymbol(briefRef.current.value.length);
      }
    }, [item.active]);

    return (
      <div className={styles.brief_descr}>
        <label htmlFor="edit_brief_descr" className={styles.label}>
          Краткое описание
          {errorsStore.editFormErrors.shortDescrError.active ? (
            <span className={styles.error}>
              {errorsStore.editFormErrors.shortDescrError.message}
            </span>
          ) : (
            ""
          )}
        </label>
        <div className={styles.input_container}>
          <input
            onChange={handleChangeInput}
            ref={briefRef}
            className={styles.input}
            type="text"
            maxLength={100}
            defaultValue={item.countryInfo.shortDescriptionRu}
            disabled={!item.countryInfo.isEdit}
            id="edit_brief_descr"
          />
          <span className={styles.counter}>{amountSymbol}/100</span>
        </div>
      </div>
    );
  },
);
