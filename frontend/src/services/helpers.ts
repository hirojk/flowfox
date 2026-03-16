import type { IconType } from '@typeDefs/global.ts'

export const getIcon = (iconList: IconType[], iconName: string): string => {
  return iconList.find((icon) => icon.name === iconName)?.icon || iconName
}

export const slugify = (string: string) => {
  return string
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}
