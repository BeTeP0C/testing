import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { TEditionsOptions } from "../../../../types/edtitionInfo";

type TAddedGameFormBriefDescr = {
  editionsOptions: TEditionsOptions[];
  setEditionOptions: React.Dispatch<React.SetStateAction<any[]>>;
  isGlobal: boolean;
};

export function AddedGameFormBriefDescr(props: TAddedGameFormBriefDescr) {
  const { editionsOptions, setEditionOptions, isGlobal } = props;
  const inputRef = useRef(null);

  const [amountSymbol, setAmountSymbol] = useState(0);
  const [isShow, setIsShow] = useState(false);

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
                  .find((el) => el.active)
                  ?.regions.find((el) => el.active)?.region
              ) {
                return { ...region, briefDescr: inputRef.current.value };
              }
              return { ...region };
            }),
          };
        }
        return { ...el };
      }),
    );
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (amountSymbol <= 100) {
      setAmountSymbol(inputRef.current.value.length);
    }
  };

  const handleShowPrompt = () => {
    setIsShow(!isShow);
  };

  return (
    <div className={styles.container}>
      <label className={styles.title} htmlFor="brief">
        Краткое описание
      </label>

      <div className={styles.content}>
        {editionsOptions
          .find((el) => el.active)
          ?.regions.map((el) => {
            return (
              <>
                {el.active ? (
                  <>
                    <input
                      ref={inputRef}
                      onChange={(e) => handleChangeInput(e)}
                      onBlur={(e) => saveInput(e)}
                      maxLength={100}
                      className={styles.input}
                      type="text"
                      name="brief"
                      placeholder="Введите краткое описание товара..."
                      defaultValue={el.briefDescr}
                    />

                    <span className={styles.counter}>{amountSymbol}/100</span>
                    {isGlobal ? (
                      <button
                        className={styles.button}
                        onClick={() => handleShowPrompt()}
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
                ) : (
                  ""
                )}
              </>
            );
          })}
      </div>
    </div>
  );
}
