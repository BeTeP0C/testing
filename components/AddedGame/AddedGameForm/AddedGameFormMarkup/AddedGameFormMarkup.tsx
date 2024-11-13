import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { TEditionsOptions } from "../../../../types/edtitionInfo";

export function AddedGameFormMarkup(props: {
  editionsOptions: TEditionsOptions[];
  setEditionOptions: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const { editionsOptions, setEditionOptions } = props;
  const inputRef = useRef(null);

  const saveInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setEditionOptions(
      editionsOptions.map((el) => {
        if (el.active) {
          return {
            ...el,
            regions: el.regions.map((region) => {
              if (
                region.region ===
                editionsOptions
                  .find((item) => item.active)
                  ?.regions.find((item) => item.active)?.region
              ) {
                return { ...region, markup: Number(inputRef.current.value) };
              }
              return { ...region };
            }),
          };
        }
        return { ...el };
      }),
    );
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
                  </label>
                  <input
                    ref={inputRef}
                    onBlur={(e) => saveInput(e)}
                    className={styles.input}
                    type="number"
                    name="markup"
                    id="markup"
                    placeholder="Введите целое число процентов"
                    defaultValue={el.markup}
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
