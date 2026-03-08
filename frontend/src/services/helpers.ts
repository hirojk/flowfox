import type { IconType } from '@typeDefs/global.ts'

export const getIcon = (iconList: IconType[], iconName: string): string => {
  return iconList.find((icon) => icon.name === iconName)?.icon || iconName
}
