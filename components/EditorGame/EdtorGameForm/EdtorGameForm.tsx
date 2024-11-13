import React from "react";
import styles from "./styles.module.scss";

type TEditorGameForm = {
  children: React.ReactNode;
};

export function EditorGameForm({ children }: TEditorGameForm) {
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      {children}
    </form>
  );
}
