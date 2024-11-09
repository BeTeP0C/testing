import React, { useContext } from "react";
import styles from "./styles.module.scss"
import { IconProps } from "../../../types/icons";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../MainPage";

type TMenuItemProps = {
  page: string,
  active: boolean,
  Icon:  ({ width, height }: IconProps) => React.JSX.Element,
  type: string
}

export const MenuItem = observer(({Icon, page, active, type}: TMenuItemProps) => {
  const store = useContext(StoreContext)

  return (
    <li className={styles.item}>
      {/* <a className={styles.link + " " + `${active ? styles.link_active : ""}`} href={href}>
        <Icon />
      </a> */}

      <button onClick={() => {store.changePage(page)}} className={styles.link + " " + `${page === store.currentPage ? styles.link_active : ""} ${type === "fill" && page === store.currentPage ? styles.link_active_fill : type === "stroke" && page === store.currentPage ? styles.link_active_stroke : ""}`}>
        <Icon />
      </button>
    </li>
  )
})
