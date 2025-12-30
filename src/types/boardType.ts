export interface BoardColumnType {
  id: number;
  columnName: string;
  cards: BoardCardType[];
}

export interface BoardCardType {
  id: number;
  taskName: string;
  priority: 'low' | 'middle' | 'high';
  description?: string;
}
