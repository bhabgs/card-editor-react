import config from "@/components/Layout/config";
import { getZoomByDom } from "@/store/layoutEditor/zoom";

export default () => {
  const marker = document.getElementById(config.markerBoxId)!;
  const layoutEditorDom = document.getElementById(config.layoutEditorBoxId)!;
  let startX = 0;
  let startY = 0;

  // 移动元素的原始位置
  let originX = 0;
  let originY = 0;

  let zoom = 1;
  // 显示隐藏marker
  const markerSetVisible = (v: boolean) => {
    marker.style.display = v ? "block" : "none";
  };
  // 监听鼠标移动事件
  const handleMouseMove = (e: MouseEvent) => {
    // 鼠标移动时的坐标
    const endX = e.clientX;
    const endY = e.clientY;
    // 计算移动距离
    const moveX = endX - startX;
    const moveY = endY - startY;
    // 设置移动元素位置
    layoutEditorDom.style.left = `${originX + moveX / zoom}px`;
    layoutEditorDom.style.top = `${originY + moveY / zoom}px`;
  };

  // 鼠标按下事件
  const mousedownEvent = (e: MouseEvent) => {
    // 鼠标按下时的坐标
    startX = e.clientX;
    startY = e.clientY;
    // 获取元素的原始位置
    originX = layoutEditorDom.offsetLeft;
    originY = layoutEditorDom.offsetTop;

    // 查询元素zoom
    zoom = getZoomByDom(layoutEditorDom);

    // 鼠标移动事件
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", () => {
      // 移除鼠标移动事件
      document.removeEventListener("mousemove", handleMouseMove);
      // 移除鼠标抬起事件
      document.removeEventListener("mouseup", mousedownEvent);
      // 移除鼠标按下事件
      document.removeEventListener("mousedown", mousedownEvent);
    });
  };
  // 监听键盘事件
  const handleKeyDown = (e: KeyboardEvent) => {
    // 拖拽视图
    if (e.code === "Space") {
      // 显示arker 遮罩
      markerSetVisible(true);
      // 监听鼠标在marker下按下

      document.addEventListener("mousedown", mousedownEvent);
    }
  };
  document.addEventListener("keydown", handleKeyDown);
  // 键盘抬起
  document.addEventListener("keyup", (e) => {
    markerSetVisible(false);
    // 空格键取消移动视图
    if (e.code === "Space") {
      document.removeEventListener("mousemove", handleMouseMove);
    }
  });
  return {
    removeEvent() {
      document.removeEventListener("keydown", handleKeyDown);
    },
  };
};
