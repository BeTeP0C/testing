import React from "react";
import styles from "./styles.module.scss";

type TAuthForm = {
  children: React.ReactNode;
};

export function AuthForm({ children }: TAuthForm) {
  return <form className={styles.form}>{children}</form>;
}
