import {
  LayoutEditorNode,
  LayoutEditorRoot,
} from "@/store/layoutEditor/layoutEditor";
import Node from "../Layout/Node";

interface Iprops {
  nodeTree: LayoutEditorNode[];
  rootNode: LayoutEditorRoot;
}
const Preview = (props: Iprops) => {
  const { nodeTree, rootNode } = props;
  const style = {
    ...rootNode.styles,
    width: rootNode.resolutionWidth,
    height: rootNode.resolutionHeight,
    flex: 1,
    overflow: "hidden",
    display: "grid",
  };
  return (
    <div style={style}>
      {nodeTree.map((item) => (
        <Node key={item.id} {...item} isPreview />
      ))}
    </div>
  );
};

export default Preview;
