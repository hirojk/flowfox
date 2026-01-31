import type { IconType } from 'src/types/global';

export const getIcon = (iconList: IconType[], iconName: string) => {
  return iconList.find((icon) => icon.name === iconName)?.icon;
};
