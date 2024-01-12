import { observer } from "mobx-react-lite";
import store from "@/store";
import { useEffect, useRef } from "react";
import config from "@/components/Layout/config";
import stateEvents from "./stateEvents";
import styles from "./index.module.less";
import LayoutEditor from "./Editor";

const Main = () => {
  const { zoom, rootNode } = store.layoutEditorStore;
  // zoom
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    zoom.fitCanvas();
    const { removeEvent } = stateEvents.dragMove();
    window.addEventListener("wheel", zoom.whellEvent);
    // 鼠标离开画布时
    domRef.current?.parentElement?.addEventListener("mouseleave", () => {
      zoom.setCanWheel(false);
    });
    // 鼠标进入画布时
    domRef.current?.parentElement?.addEventListener("mouseenter", () => {
      zoom.setCanWheel(true);
    });
    return () => {
      removeEvent();
      window.removeEventListener("wheel", zoom.whellEvent);
    };
  }, []);

  return (
    <div
      ref={domRef}
      id={config.layoutEditorBoxId}
      className={styles.main}
      style={{
        width: rootNode.resolutionWidth,
        height: rootNode.resolutionHeight,
        position: "absolute",
        zoom: zoom.value,
      }}
    >
      <LayoutEditor />
    </div>
  );
};

export default observer(Main);
