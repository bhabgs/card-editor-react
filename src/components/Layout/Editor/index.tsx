import { observer } from "mobx-react-lite";
import store from "@/store";
import LayoutNode from "@/components/Layout/Node";
import styles from "./index.module.less";

const LayoutEditor = () => {
  const { layoutEditorStore } = store;

  return (
    <div
      className={styles.layout}
      style={JSON.parse(JSON.stringify(layoutEditorStore.rootNode.styles))}
    >
      {layoutEditorStore.nodeTree.map((node) => (
        <LayoutNode key={node.id} {...node} />
      ))}
    </div>
  );
};

export default observer(LayoutEditor);
