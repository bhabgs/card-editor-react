import config from "@/components/Layout/config";
import { makeAutoObservable } from "mobx";

// 获取一个元素的缩放级别
export const getZoomByDom = (dom: HTMLElement) => {
  // 获取元素的计算样式
  const computedStyle = window.getComputedStyle(dom);

  // 获取 zoom 属性
  const zoom =
    //@ts-ignore
    computedStyle.zoom ||
    //@ts-ignore
    computedStyle.webkitZoom ||
    //@ts-ignore
    computedStyle.mozZoom ||
    1;

  return Number(zoom);
};

export class LayoutEditorZoomStore {
  constructor() {
    makeAutoObservable(this);
  }
  value = 1;
  // 缩放步长
  DEFAULTVAL = 0.008;
  // 最大缩放
  MAXZOOM = 18;
  // 最小缩放
  MINZOOM = 0.0005;
  setZoom = (zoom: number) => {
    this.value = zoom;
  };
  getZoom = () => {
    return (this.value * 100).toFixed(2) + "%";
  };
  zoomIn = () => {
    const zoom = this.value - this.DEFAULTVAL;
    if (zoom < this.MINZOOM) return;
    this.setZoom(zoom);
  };

  zoomOut = () => {
    const zoom = this.value + this.DEFAULTVAL;
    if (zoom > this.MAXZOOM) return;
    this.setZoom(zoom);
  };

  fitCanvas = () => {
    const layoutEditorDom = document.getElementById(config.layoutEditorBoxId)!;
    // 获取元素的父级元素
    const parentDom = layoutEditorDom.parentElement!;
    // 获取元素的宽高
    const { width, height } = layoutEditorDom.getBoundingClientRect();
    // 获取父级元素的宽高
    const { width: parentWidth, height: parentHeight } =
      parentDom.getBoundingClientRect();

    // 计算缩放比例
    const zoomX = parentWidth / width;
    const zoomY = parentHeight / height;

    // 获取最小缩放比例
    const zoom = Math.min(zoomX, zoomY);

    this.setZoom(zoom * 0.8);
    // 缩放后的宽高
    const newWidth = width * zoomX;
    const newHeight = height * zoomY;
    // 设置元素位置

    layoutEditorDom.style.left = `${parentWidth - newWidth}px`;
    layoutEditorDom.style.top = `${parentHeight - newHeight}px`;
  };

  // 是否能触发滚轮事件
  canWheel = true;
  // 设置是否能触发滚轮事件
  setCanWheel = (canWheel: boolean) => {
    this.canWheel = canWheel;
  };

  whellEvent = (e: WheelEvent) => {
    const { deltaY } = e;
    if (!this.canWheel) return;
    // 滚轮向下滚动
    if (deltaY > 0) {
      // 缩小
      this.zoomOut();
    } else {
      // 放大
      this.zoomIn();
    }
  };
}

export default LayoutEditorZoomStore;
