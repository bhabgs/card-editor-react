import { LayoutEditorNode } from "@/store/layoutEditor/layoutEditor";
import { observer } from "mobx-react-lite";
import classnames from "classnames";
import store from "@/store";
import CardComponent from "@/components/Card/Card";
import classStyles from "./index.module.less";

interface Iprops extends LayoutEditorNode {
  isPreview?: boolean;
}
const LayoutNode = (props: Iprops) => {
  const { selectNode, selectedNode, updateCardInfo } = store.layoutEditorStore;
  const { getCardById } = store.cardEditorStore;
  const { isPreview } = props;
  // 设置选中的节点
  const setSelectNode = (nodeInfo: LayoutEditorNode) => {
    selectNode(nodeInfo);
  };
  if (props.children.length <= 0) {
    const events = !isPreview
      ? {
          onClick: (e: React.DragEvent<HTMLDivElement>) => {
            e.stopPropagation();
            setSelectNode(props);
          },
          onDrop: (e: React.DragEvent<HTMLDivElement>) => {
            const id = e.dataTransfer.getData("id");
            const cardinfo = getCardById(id)!;
            selectNode(props);
            updateCardInfo(cardinfo);
          },
          onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
          },
        }
      : {};

    return (
      <div
        className={classnames(classStyles.card, {
          [classStyles.editor]: !isPreview,
          [classStyles.selected]: selectedNode?.id === props.id,
        })}
        {...events}
      >
        {props.cardInfo && (
          <CardComponent
            title={props.cardInfo?.title}
            code={props.cardInfo?.code}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={classnames(classStyles.cardBox, {
        [classStyles.editor]: !isPreview,
        [classStyles.selected]: selectedNode?.id === props.id,
      })}
      style={JSON.parse(JSON.stringify(props.styles))}
    >
      {props.children.map((item) => (
        <LayoutNode key={item.id} {...item} isPreview={isPreview} />
      ))}
    </div>
  );
};

export default observer(LayoutNode);
