export const getRandomElements = <T>(
  array: T[],
  minQuantity: number,
  maxQuantity: number
): T[] => {
  const quantity =
    Math.floor(Math.random() * (maxQuantity - minQuantity + 1)) + minQuantity
  const shuffled = array.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, quantity)
}
