export const generateId = (): number => {
  return Math.floor((Date.now() + Math.random() * 1000) % 100_000_000)
}
