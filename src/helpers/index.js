// eslint-disable-next-line import/prefer-default-export
export const getRandomInArray = (array, indexToExclude = null) => {
  // Returns a random item in an array, but never
  // an item with an index matching `indexToExclude`.
  const randomIndex = Math.floor(Math.random() * array.length)
  if (randomIndex === indexToExclude) {
    return getRandomInArray(array, indexToExclude)
  }
  return array[randomIndex]
}
