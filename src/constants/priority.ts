import type { BoardCardType } from 'src/types/boardType';
import type { IconType } from 'src/types/global';

export const PRIORITY_LIST: IconType[] = [
  { name: 'Critical', icon: 'icon-critical' },
  { name: 'High', icon: 'icon-high' },
  { name: 'Medium', icon: '' },
  { name: 'Low', icon: 'icon-low' },
];

export const sortedCardsByPriority = (
  cards: BoardCardType[],
): BoardCardType[] => {
  return [...cards].sort((a, b) => {
    const aIdx = PRIORITY_LIST.findIndex(
      (p) => p.name === (a.priority ?? 'Low'),
    );
    const bIdx = PRIORITY_LIST.findIndex(
      (p) => p.name === (b.priority ?? 'Low'),
    );
    return aIdx - bIdx;
  });
};
