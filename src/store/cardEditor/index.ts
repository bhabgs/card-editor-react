import { makeAutoObservable } from "mobx";
import { Store } from "..";
import defaultCode from "./defaultCode";

export interface CardInfo {
  title: string;
  code: string;
  id: string;
}

export class CardEditorStore {
  constructor(store: Store) {
    this.store = store;
    makeAutoObservable(this);
  }

  store!: Store;

  // 卡片列表
  cards: Array<CardInfo> = [];

  // 添加卡片
  addCard(card: CardInfo) {
    this.cards.push(card);
  }
  // 获取卡片根据id
  getCardById = (id: string) => {
    return this.cards.find((card) => card.id === id);
  };

  // 删除卡片
  removeCard() {}

  // 编辑器代码
  code = defaultCode;

  // title
  title = "卡片标题";

  // 设置标题
  setTitle(title: string) {
    this.title = title;
  }

  // 设置编辑器代码
  setCode(code: string) {
    this.code = code;
  }
  // 获取编辑器代码
  getCode() {
    return this.code;
  }
}

export default CardEditorStore;
