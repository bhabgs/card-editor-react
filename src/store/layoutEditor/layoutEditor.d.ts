import { CSSProperties } from "react";
import { CardInfo } from "../cardEditor";

export interface CompontntProps {
  compilerCode: string; // 编译器代码
}

export interface LayoutEditorNode {
  id: string; // 节点id
  type: string; // 节点类型
  name: string; // 节点名称
  title: string; // 节点标题
  isRoot?: boolean; // 是否是根节点
  rows: number; // 行数
  cols: number; // 列数
  componentProps: CompontntProps; // 组件属性
  previewImage?: string; // 预览图
  styles: CSSProperties; // 节点样式
  sort: number; // 排序
  cardInfo?: CardInfo;
  children: LayoutEditorNode[];
}

export interface LayoutEditorRoot extends Omit<LayoutEditorNode, "sort"> {
  // 平台
  platform: string;
  // 项目名称
  projectName: string;
  // 项目描述
  projectDescription: string;
  // 项目版本
  projectVersion: string;
  //  分辨率宽
  resolutionWidth: number;
  // 分辨率高
  resolutionHeight: number;
  // 预览图
  previewImage?: string;
}
