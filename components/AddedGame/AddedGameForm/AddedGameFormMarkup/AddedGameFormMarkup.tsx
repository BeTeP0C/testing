import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { TEditionsOptions } from "../../../../types/edtitionInfo";

export function AddedGameFormMarkup(props: {
  editionsOptions: TEditionsOptions[];
  setEditionOptions: React.Dispatch<React.SetStateAction<any[]>>;
  error: {
    errorMessage: string,
    activate: boolean,
    visible: boolean,
  }
}) {
  const { editionsOptions, setEditionOptions, error } = props;
  const inputRef = useRef(null);

  const saveInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setEditionOptions(
      editionsOptions.map((el) => {
        if (el.active) {
          return {
            ...el,
            markup: Number(inputRef.current.value),
            regions: el.regions.map((region) => {
              if (
                region.region ===
                editionsOptions
                  .find((item) => item.active)
                  ?.regions.find((item) => item.active)?.region
              ) {
                return { ...region };
              }
              return { ...region };
            }),
          };
        }
        return { ...el };
      }),
    );
  };

  const checkNumberInInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (!/^\d+$/.test(value)) {
      e.currentTarget.value = value.slice(0, -1);
    }
  };

  return (
    <div className={styles.container}>
      {editionsOptions
        .find((el) => el.active)
        ?.regions.map((el) => {
          return (
            <>
              {el.active ? (
                <>
                  <label className={styles.title} htmlFor="markup">
                    Наценка

                    {error?.visible ? <span className={styles.error}>{error.errorMessage}</span> : ""}
                  </label>
                  <input
                    ref={inputRef}
                    onBlur={(e) => saveInput(e)}
                    onInput={(e) => checkNumberInInput(e)}
                    className={styles.input}
                    type="text"
                    name="markup"
                    id="markup"
                    placeholder="Введите целое число процентов"
                    defaultValue={
                      editionsOptions.find((item) => item.active).markup
                    }
                  />
                </>
              ) : (
                ""
              )}
            </>
          );
        })}
    </div>
  );
}
