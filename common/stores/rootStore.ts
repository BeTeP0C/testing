import { GlobalStore } from "./globalStore";
import { TableStore } from "./tableStore";
import { EditorStore } from "./editorStore";
import { AddStore } from "./addStore";
import { ErrorsStore } from "./errorsStore";

export class RootStore {
  globalStore: GlobalStore
  errorsStore: ErrorsStore
  tableStore: TableStore
  editorStore: EditorStore
  addStore: AddStore

  constructor () {
    this.globalStore = new GlobalStore(this)
    this.errorsStore = new ErrorsStore(this)
    this.tableStore = new TableStore(this)
    this.editorStore = new EditorStore(this)
    this.addStore = new AddStore(this)
  }
}
