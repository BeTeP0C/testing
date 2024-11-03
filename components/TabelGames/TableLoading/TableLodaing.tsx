import React from "react";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss"

export function TableLoading () {
  return (
    <div className={styles.spinner}></div>
  )
}
