import Store from "@/store";
import { observer } from "mobx-react-lite";
import { Modal } from "antd";
import styles from "./index.module.less";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Preview from "@/components/Preview";
import FitScreen from "@fit-screen/react";
const Header = () => {
  const { zoom, rootNode, nodeTree } = Store.layoutEditorStore;
  const nav = useNavigate();
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.header}>
      <button
        onClick={() => {
          nav("/cardEditor");
        }}
      >
        去卡片编辑页
      </button>
      <button
        onClick={() => {
          zoom.zoomIn();
        }}
      >
        -
      </button>
      &nbsp;
      <span>{zoom.getZoom()}</span>&nbsp;
      <button
        onClick={() => {
          zoom.zoomOut();
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        预览
      </button>
      <Modal
        wrapClassName="screenModal"
        open={visible}
        width={"100%"}
        destroyOnClose
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
        footer={null}
      >
        <FitScreen
          width={rootNode.resolutionWidth}
          height={rootNode.resolutionHeight}
          mode="fit"
        >
          <Preview nodeTree={nodeTree} rootNode={rootNode} />
        </FitScreen>
      </Modal>
    </div>
  );
};

export default observer(Header);
