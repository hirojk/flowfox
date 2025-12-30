import type { BoardCardType } from 'src/types/boardType';
export const PRIORITY_ORDER = ['High', 'Medium', 'Low'] as const;

export const sortedCardsByPriority = (
  cards: BoardCardType[],
): BoardCardType[] => {
  return [...cards].sort((a, b) => {
    const aIdx = PRIORITY_ORDER.indexOf(a.priority ?? 'Low');
    const bIdx = PRIORITY_ORDER.indexOf(b.priority ?? 'Low');
    return aIdx - bIdx;
  });
};
