import type { IconType } from 'src/types/global';

export const selectIcon = (iconList: IconType[], iconName: string) => {
  return iconList.find((icon) => icon.name === iconName)?.icon;
};
