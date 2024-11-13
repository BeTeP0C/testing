import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { IconProps } from "../../../types/icons";
import { StoreContext } from "../../MainPage";

type TMenuItemProps = {
  page: string;
  active: boolean;
  Icon: ({ width, height }: IconProps) => React.JSX.Element;
  type: string;
};

export const MenuItem = observer(({ Icon, page, type }: TMenuItemProps) => {
  const store = useContext(StoreContext);

  return (
    <li className={styles.item}>
      <button
        type="button"
        onClick={() => {
          store.changePage(page);
        }}
        className={
          `${styles.link} ` +
          `${page === store.currentPage ? styles.link_active : ""}
          ${(() => {
            if (type === "fill" && page === store.currentPage) {
              return styles.link_active_fill;
            }
            if (type === "stroke" && page === store.currentPage) {
              return styles.link_active_stroke;
            }
            return "";
          })()}`
        }
      >
        <Icon />
      </button>
    </li>
  );
});
