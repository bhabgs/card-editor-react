import { observer } from "mobx-react-lite";
import store from "@/store";
import LayoutEditor from "@/components/Layout";
import config from "@/components/Layout/config";
import styles from "./index.module.less";
import Header from "./header";
import Control from "./control";
import CardList from "./cardList";

const Stage = () => {
  const { selectNode, rootNode } = store.layoutEditorStore;

  return (
    <div className={styles.stage}>
      <div className={styles.cardListBox}>
        <CardList />
      </div>
      <div className={styles.stageBoxCenter}>
        <Header />
        <div
          className={styles.stageBox}
          onClick={() => {
            selectNode(rootNode);
          }}
        >
          <LayoutEditor />
          <div id={config.markerBoxId} className={styles.marker}></div>
        </div>
      </div>
      <Control />
    </div>
  );
};

export default observer(Stage);
