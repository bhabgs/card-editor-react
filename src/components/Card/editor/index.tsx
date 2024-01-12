import store from "@/store";
import MonacoEditor from "@monaco-editor/react";
import { Input } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";

let timer: NodeJS.Timeout;
const { TextArea } = Input;
const Editor = () => {
  const { cardEditorStore } = store;

  const [code] = useState(cardEditorStore.code);

  return (
    <div>
      <TextArea
        defaultValue={code}
        onChange={(e) => {
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            cardEditorStore.setCode(e.target.value || "");
          }, 200);
        }}
        placeholder="Controlled autosize"
        autoSize={{ minRows: 3, maxRows: 100 }}
      />
      {/* <MonacoEditor
        language="javascript"
        theme="va-dark"
        defaultValue={code}
        onChange={(e) => {
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            cardEditorStore.setCode(e || "");
          }, 200);
        }}
      /> */}
    </div>
  );
};

export default observer(Editor);
