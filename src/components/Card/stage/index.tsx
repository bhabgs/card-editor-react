import { observer } from "mobx-react-lite";
import html2canvas from "html2canvas";
import { Modal, Input } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";
import store from "@/store";
import CardComponent from "../Card";
import { useState } from "react";
import { createRandomId } from "@/utils";

const Stage = () => {
  const { cardEditorStore } = store;
  const [visible, setVisible] = useState(false);
  const nav = useNavigate();
  return (
    <div className={styles.stageBox}>
      <Modal
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      >
        <Input
          defaultValue={cardEditorStore.title}
          onChange={(e) => {
            cardEditorStore.setTitle(e.target.value);
          }}
        />
      </Modal>
      <div className={styles.header}>
        <button
          onClick={() => {
            nav("/");
          }}
        >
          返回页面编辑
        </button>
        <button
          onClick={() => {
            setVisible(true);
          }}
        >
          编辑title
        </button>
        <button
          onClick={() => {
            cardEditorStore.addCard({
              title: cardEditorStore.title,
              code: cardEditorStore.getCode(),
              id: createRandomId(8, "card"),
            });
          }}
        >
          保存
        </button>
        <button
          onClick={() => {
            const dom = document.getElementById("cardBox")!;
            html2canvas(dom).then((canvas) => {
              const dataUrl = canvas.toDataURL("image/png");
              const a = document.createElement("a");
              a.href = dataUrl;
              a.download = "快照.png";
              a.click();
            });
          }}
        >
          生成快照
        </button>
      </div>
      <div id="cardBox" style={{ display: "flex", flex: 1 }}>
        <CardComponent
          title={cardEditorStore.title}
          code={cardEditorStore.getCode()}
        />
      </div>
    </div>
  );
};

export default observer(Stage);
