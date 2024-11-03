import React from "react";
import styles from "./styles.module.scss"
import { IconProps } from "../../../types/icons";

type TMenuItemProps = {
  href: string,
  active: boolean,
  Icon:  ({ width, height }: IconProps) => React.JSX.Element
}

export function MenuItem ({Icon, href, active}: TMenuItemProps) {
  return (
    <li className={styles.item}>
      <a className={styles.link + " " + `${active ? styles.link_active : ""}`} href={href}>
        <Icon />
      </a>
    </li>
  )
}
