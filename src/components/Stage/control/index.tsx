import { observer } from "mobx-react-lite";
import { Input, Button } from "antd";
import store from "@/store";
import styles from "./index.module.less";

const control = () => {
  const {
    selectedNode,
    selectNode,
    updateNodeGrid,
    updateNodeSize,
    clearNode,
  } = store.layoutEditorStore;
  return (
    <div className={styles.controlBox}>
      <Input
        value={selectedNode?.rows}
        addonBefore="行数"
        suffix="个"
        onChange={(e) => {
          selectedNode.rows = Number(e.target.value);
          updateNodeGrid();
        }}
      />

      <Input
        value={selectedNode?.cols}
        addonBefore="列数"
        suffix="个"
        onChange={(e) => {
          selectedNode.cols = Number(e.target.value);
          updateNodeGrid();
        }}
      />

      <Input
        value={selectedNode.styles.width}
        addonBefore="宽"
        suffix="px"
        onChange={(e) => {
          selectedNode.styles.width = Number(e.target.value);
          updateNodeSize();
        }}
      />
      <Input
        value={selectedNode.styles.height}
        addonBefore="高"
        suffix="px"
        onChange={(e) => {
          selectedNode.styles.height = Number(e.target.value);
          updateNodeSize();
        }}
      />
      <Input
        value={selectedNode.styles.gap}
        addonBefore="间距"
        suffix="px"
        onChange={(e) => {
          selectedNode.styles.gap = Number(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          selectNode(selectedNode, true);
        }}
      >
        获取父级节点
      </Button>

      <Button
        onClick={() => {
          clearNode();
        }}
      >
        清空节点
      </Button>

      <Button onClick={() => {}}>reload节点</Button>
    </div>
  );
};
export default observer(control);
