import { action, makeAutoObservable } from "mobx";
import { Store } from "..";
import { LayoutEditorNode, LayoutEditorRoot } from "./layoutEditor";
import { createRandomId, getRowAndCol } from "@/utils";
import zoomStore from "./zoom";
import { CardInfo } from "../cardEditor";

export class LayoutEditorStore {
  constructor(store: Store) {
    this.store = store;
    this.zoom = new zoomStore();
    makeAutoObservable(this);
    this.reset();
  }
  store!: Store;

  zoom!: zoomStore;
  // 节点树
  nodeTree: Array<LayoutEditorNode> = [];

  // 跟节点
  rootNode: LayoutEditorRoot = {
    id: createRandomId(8, "root_"),
    type: "root",
    name: "root",
    title: "root",
    isRoot: true,
    rows: 1,
    cols: 1,
    componentProps: {
      compilerCode: "",
    },
    children: [],
    styles: {},
    platform: "",
    projectName: "",
    projectDescription: "",
    projectVersion: "",
    cardInfo: {
      title: "",
      code: "",
      id: "",
    },
    resolutionWidth: 1920,
    resolutionHeight: 1080,
  };

  // 被选中的节点
  selectedNode: LayoutEditorNode | LayoutEditorRoot = this.rootNode;

  // 选中节点
  selectNode = (
    node: LayoutEditorNode | LayoutEditorRoot,
    parent?: boolean
  ) => {
    if (node.isRoot) return (this.selectedNode = this.rootNode);

    if (parent) {
      const parentNode = this.getParentNode(node as LayoutEditorNode);
      if (parentNode) {
        this.selectedNode = parentNode;
      }
      return;
    }
    this.selectedNode = this.getNodeById(node.id)!;
  };

  // 根据id获取节点
  getNodeById = (id: string) => {
    let node = null;
    const findNode = (nodeList: Array<LayoutEditorNode>) => {
      for (let i = 0; i < nodeList.length; i++) {
        const item = nodeList[i];
        if (item.id === id) {
          node = item;
          break;
        }
        if (item.children) {
          findNode(item.children);
        }
      }
    };
    findNode(this.nodeTree);
    return node || null;
  };

  // 获取节点的父级节点
  getParentNode = (node: LayoutEditorNode) => {
    let parentNode = null;
    const findParentNode = (nodeList: Array<LayoutEditorNode>) => {
      for (let i = 0; i < nodeList.length; i++) {
        const item = nodeList[i];
        if (item.children?.includes(node)) {
          parentNode = item;
          break;
        }
        if (item.children) {
          findParentNode(item.children);
        }
      }
    };
    findParentNode(this.nodeTree);
    return parentNode || this.rootNode;
  };

  // 创建单个节点
  createNode(node: LayoutEditorNode) {}

  // 创建默认节点
  createDefaultNode: (i: number) => LayoutEditorNode = (sort) => {
    const id = createRandomId(8, "node_");
    return {
      id,
      type: "",
      name: "",
      title: "",
      rows: 1,
      cols: 1,
      sort,
      componentProps: {
        compilerCode: "",
      },
      styles: {},
      children: [],
    };
  };

  // 删除单个节点
  deleteNode(node: LayoutEditorNode) {}

  // 更新单个节点
  updateNode(node: LayoutEditorNode) {}

  // 清空当前节点
  clearNode = () => {
    const node = this.selectedNode;
    node.rows = 1;
    node.cols = 1;
    this.updateNodeGrid();
  };

  // 获取节点树
  getNodeTree() {}

  // 更近节点网格
  updateNodeGrid = () => {
    const node = this.selectedNode;
    const { rows, cols } = this.selectedNode;
    const usedChildren = node.isRoot ? this.nodeTree : node.children!;

    // 清空子级节点
    usedChildren.splice(0, usedChildren.length);

    // 根据行数和列数创建子级节点
    let gridTemplateRows = "";
    let gridTemplateColumns = "";

    for (let i = 0; i < rows * cols; i++) {
      usedChildren.push(this.createDefaultNode(i));
    }
    // 设置列的网格分布
    for (let i = 0; i < rows; i++) {
      gridTemplateRows += "1fr ";
    }
    // 设置行的网格分布
    for (let i = 0; i < cols; i++) {
      gridTemplateColumns += "1fr ";
    }
    node.styles = {
      ...node.styles,
      gridTemplateRows,
      gridTemplateColumns,
    };
  };

  // 更新宽高
  updateNodeSize = () => {
    const { styles, sort } = this.selectedNode as LayoutEditorNode;
    const { width, height } = styles;
    const parentInfo = this.getParentNode(
      this.selectedNode as LayoutEditorNode
    )!;
    const { gridTemplateColumns, gridTemplateRows } = parentInfo.styles;
    const { col, row } = getRowAndCol(sort, parentInfo.cols, parentInfo.rows);
    if (gridTemplateColumns && width) {
      const arr = (gridTemplateColumns as string).split(" ");
      arr[col] = width + "px";
      parentInfo.styles.gridTemplateColumns = arr.join(" ");
    }
    if (gridTemplateRows && height) {
      const arr = (gridTemplateRows as string).split(" ");
      arr[row] = height + "px";
      parentInfo.styles.gridTemplateRows = arr.join(" ");
    }
  };

  updateCardInfo = (cardInfo: CardInfo) => {
    (this.selectedNode as LayoutEditorNode).cardInfo = cardInfo;
  };

  reset() {
    this.nodeTree = [];
    this.selectNode(this.rootNode);
    this.updateNodeGrid();
  }
}

export default LayoutEditorStore;
