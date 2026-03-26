import type { IconType } from '@typeDefs/globalTypes'

export const getIcon = (iconList: IconType[], iconName: string): string => {
  return iconList.find((icon) => icon.name === iconName)?.icon || iconName
}
