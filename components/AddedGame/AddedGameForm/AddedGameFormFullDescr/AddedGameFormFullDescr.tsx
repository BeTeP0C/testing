import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { TEditionsOptions } from "../../../../types/edtitionInfo";

type TAddedGameFormFullDescr = {
  editionsOptions: TEditionsOptions[];
  setEditionOptions: React.Dispatch<React.SetStateAction<any[]>>;
  isGlobal: boolean;
};

export function AddedGameFormFullDescr(props: TAddedGameFormFullDescr) {
  const { editionsOptions, setEditionOptions, isGlobal } = props;
  const inputRef = useRef(null);
  const [amountSymbol, setAmountSymbol] = useState(0);
  const [isShow, setIsShow] = useState(false);

  const saveInput = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
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
                return { ...region, fullDescr: inputRef.current.value };
              }
              return { ...region };
            }),
          };
        }
        return { ...el };
      }),
    );
  };

  const handleShowPrompt = () => {
    setIsShow(!isShow);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (amountSymbol <= 500) {
      setAmountSymbol(e.currentTarget.value.length);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.title} htmlFor="full">
        Полное описание
      </label>

      <div className={styles.content}>
        {editionsOptions
          .find((el) => el.active)
          ?.regions.map((el) => {
            return (
              <>
                {el.active ? (
                  <>
                    <textarea
                      ref={inputRef}
                      onChange={(e) => handleChangeInput(e)}
                      onBlur={(e) => saveInput(e)}
                      maxLength={500}
                      className={styles.input}
                      name="full"
                      id="full"
                      placeholder="Введите полное описание товара..."
                      defaultValue={el.fullDescr}
                      disabled={isGlobal}
                    />
                    <span className={styles.counter}>{amountSymbol}/500</span>
                    {isGlobal ? (
                      <button
                        type="button"
                        className={styles.button}
                        onClick={() => handleShowPrompt()}
                      />
                    ) : (
                      ""
                    )}
                    {isShow && isGlobal ? (
                      <span className={`${styles.prompt}`}>
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
