import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { MagazineStore } from "../../common/store";
import { ButtonAddProduct } from "../ButtonAddProduct";
import { ButtonDeleteProduct } from "../ButtonDeleteProduct";

const magazineStore = new MagazineStore();

type TButtonsStateProductProps = {
  children: React.ReactNode;
};

export const ButtonsStateProduct = observer(
  ({ children }: TButtonsStateProductProps) => {
    return (
      <div
        className={magazineStore.isOpenGameInfo.open ? styles.container : ""}
      >
        {/* <ButtonAddProduct /> */}
        {children}
        {/* {magazineStore.isOpenGameInfo.open ? <ButtonDeleteProduct /> : ""} */}
      </div>
    );
  },
);
