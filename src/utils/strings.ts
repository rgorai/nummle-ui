export const capitalizeFirstLetter = (string: string) =>
  string.length > 0 ? string[0].toUpperCase() + string.slice(1) : ''
