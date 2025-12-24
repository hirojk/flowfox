export interface KanbanColumnType {
  id: number;
  columnName: string;
  cards: KanbanCardType[];
}

export interface KanbanCardType {
  id: number;
  taskName: string;
  description?: string;
}
