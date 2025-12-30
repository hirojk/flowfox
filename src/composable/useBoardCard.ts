import type { BoardCardType } from 'src/types/boardType';

export function createNewCard(
  overrides: Partial<BoardCardType> = {},
): BoardCardType {
  return {
    id: Math.floor(Date.now() + Math.random() * 1000) % 100_000_000,
    taskName: 'New Task',
    priority: 'Low',
    description: 'No Description',
    checklist: [],
    startDate: new Date(),
    deadline: new Date(),
    tags: [],
    ...overrides,
  };
}
