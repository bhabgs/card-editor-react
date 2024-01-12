import { makeAutoObservable } from "mobx";
import { CardEditorStore } from "./cardEditor";
import LayoutEditorStore from "./layoutEditor";

export class Store {
  constructor() {
    makeAutoObservable(this);
  }
  cardEditorStore: CardEditorStore = new CardEditorStore(this);
  layoutEditorStore: LayoutEditorStore = new LayoutEditorStore(this);
}

const store = new Store();

export default store;
