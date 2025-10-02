export interface VirtualListProps<T> {
  data: T[];               // 数据源
  itemHeight: number;      // 每一项高度（固定）
  height: number;          // 容器可视高度
}