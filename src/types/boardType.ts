import type { colorsRgba } from 'quasar';

export interface BoardColumnType {
  id: number;
  columnName: string;
  cards: BoardCardType[];
}

export interface BoardCardType {
  id: number;
  taskName: string;
  priority: 'Low' | 'Middle' | 'High';
  description: string;
  checklist: Array<{
    item: string;
    completed: boolean;
  }>;
  startDate: Date;
  deadline: Date;
  tags: Array<{
    label: string;
    color: colorsRgba;
  }>;
}
