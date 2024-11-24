import React from "react";
import styles from "./styles.module.scss";
import { TEditionsOptions } from "../../../../types/edtitionInfo";

type TAddedGameFormPrices = {
  editionOptions: TEditionsOptions[]
}

export function AddedGameFormPrices({editionOptions}: TAddedGameFormPrices) {

  return (
    <div className={styles.container}>
      {editionOptions.map(el => {
        if (el.active) {
          return (
            <>
              <div className={styles.not_markup}>
                <h3 className={styles.title}>Стоимость без наценки</h3>
                <span className={styles.price}>{el.price} руб.</span>
              </div>
              <div className={styles.with_markup}>
                <h3 className={styles.title}>Стоимость с наценкой</h3>
                <span className={styles.price}>{Math.floor(el.price * (1 + el.markup/100))} руб.</span>
              </div>
            </>
          )
        }
      })
      }
    </div>
  );
}
