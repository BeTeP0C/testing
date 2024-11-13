import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { TableInfoHugs } from "../../TableInfoHugs";
import { TGameInfoStore } from "../../../../../types/tgames";

export function TableInfoPlatform({ title, hugs }: TGameInfoStore) {
  const [isActive, setIsActive] = useState(false);
  const dropRef = useRef(null);

  const handleClickPlatform = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (isActive && dropRef.current) {
      dropRef.current.style.height = `${dropRef.current.scrollHeight}px`;
    } else if (dropRef.current) {
      dropRef.current.style.height = "20px";
    }
  }, [isActive]);

  return (
    <li className={styles.platform} ref={dropRef}>
      <h4 className={styles.title}>
        <button
          type="button"
          onClick={handleClickPlatform}
          className={`${styles.button} ${isActive ? styles.button_active : ""}`}
        >
          {title}
        </button>
      </h4>

      <TableInfoHugs hugs={hugs} />
    </li>
  );
}
