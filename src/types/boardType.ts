import type { PRIORITY_LIST } from 'src/utils/priority';

export interface BoardColumnType {
  id: number;
  columnName: string;
  cards: BoardCardType[];
}

export interface BoardCardType {
  id: number;
  taskName: string;
  priority: (typeof PRIORITY_LIST)[number]['name'];
  description: string;
  checklist: Array<{
    label: string;
    completed: boolean;
  }>;
  startDate: Date;
  deadline: Date;
  tags: Array<{
    label: string;
    color: string;
  }>;
}
