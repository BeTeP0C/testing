import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import { IconProps } from "../../../types/icons";
import { GlobalStore } from "../../../common/stores/globalStore";
import { RootStoreContext } from "../../../pages/_app";

type TMenuItemProps = {
  page: string;
  active: boolean;
  Icon: ({ width, height }: IconProps) => React.JSX.Element;
  type: string;
};

export const MenuItem = observer(({ Icon, page, type }: TMenuItemProps) => {
  const { globalStore } = useContext(RootStoreContext);

  return (
    <li className={styles.item}>
      <button
        type="button"
        onClick={() => {
          globalStore.changePage(page);
        }}
        className={
          `${styles.link} ` +
          `${page === globalStore.currentPage ? styles.link_active : ""}
          ${(() => {
            if (type === "fill" && page === globalStore.currentPage) {
              return styles.link_active_fill;
            }
            if (type === "stroke" && page === globalStore.currentPage) {
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
