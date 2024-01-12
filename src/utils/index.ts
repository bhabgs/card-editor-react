// 创建指定位数的随机id
export function createRandomId(len: number, prefix: string = "") {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  const maxPos = chars.length;
  let id = "";
  for (let i = 0; i < len; i++) {
    id += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return prefix + id;
}

// 获取元素在矩阵的行和列
export function getRowAndCol(
  index: number,
  col: number,
  row: number
): { row: number; col: number } {
  const colIndex = index % col;
  const rowIndex = Math.floor(index / col);
  return {
    row: rowIndex,
    col: colIndex,
  };
}
