import React, { useState } from "react";
import styles from "./styles.module.scss";
import { EditorGameForm } from "./EdtorGameForm";
import { EditorGameInputCountry } from "./EdtiorGameInputCountry";
import { EditorGameInputId } from "./EdtorGameInputId";
import { EditorGameButtonSave } from "./EdtorGameButtonSave";
import { EditorGameButtonDelete } from "./EdtorGameButtonDelete";

type TEditorGame = {
  id: number | null;
  open: boolean;
};

export function EditorGame(props: { info: TEditorGame }) {
  const { info } = props;
  const [newId, setNewId] = useState(info.id);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Редактирование товара</h2>

      <EditorGameForm>
        <EditorGameInputCountry />
        <EditorGameInputId id={info.id} func={setNewId} />

        <div className={styles.buttons}>
          <EditorGameButtonSave value={newId} />
          <EditorGameButtonDelete />
        </div>
      </EditorGameForm>
    </div>
  );
}
