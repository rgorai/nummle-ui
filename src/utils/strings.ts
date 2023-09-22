export const capitalizeFirstLetter = (string: string): string =>
  string.length > 0 ? string[0].toUpperCase() + string.slice(1) : ''

export const transformTomTomPhoneNumber = (phone: string): string => {
  const [_, number] = phone.split(' ')
  const [code, num1, num2] = number.split('-')
  return `(${code}) ${num1}-${num2}`
}
