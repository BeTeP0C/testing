import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

type TEditorGameInputId = {
  id: number;
  func: React.Dispatch<React.SetStateAction<number>>;
};

export function EditorGameInputId({ id, func }: TEditorGameInputId) {
  const [isId, setIsId] = useState(id);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsId(Number(e.target.value));
    func(Number(e.target.value));
  };

  useEffect(() => {
    setIsId(id);
  }, [id]);

  return (
    <div className={styles.container}>
      <label htmlFor="id" className={styles.title}>
        ID объявления
      </label>

      <input
        onChange={(e) => changeValue(e)}
        className={styles.input}
        type="text"
        name="id"
        id="id"
        value={isId}
      />
    </div>
  );
}
