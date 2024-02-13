import reactions from '../tson/reactions'

// PRIMITIVES

const isValidString = (str: any) =>
  typeof str === 'string' && str.trim().length !== 0

export const areValidStrings = (data: { [key: string]: any }) => {
  for (const k in data)
    if (!isValidString(data[k]))
      throw `${k} must be a non-empty string. Received: ${data[k]}`
}

export const areValidNumbers = <T extends Record<string, any>>(
  data: T,
  options?: {
    min?: number
    max?: number
  }
): Record<string, number> => {
  const ret: Record<keyof T, number> = {} as any
  for (const k in data) {
    const currVal = data[k]

    if (isNaN(currVal))
      throw `${k} must be a valid number. Received: ${currVal}`
    else if (
      (options?.min !== undefined && currVal < options.min) ||
      (options?.max !== undefined && currVal > options.max)
    )
      throw `${k} must be a valid number ${
        options.min !== undefined ? `${options.min} or more` : ''
      }${
        options.min !== undefined && options.max !== undefined ? ' and ' : ''
      }${
        options.max !== undefined ? `${options.max} or less` : ''
      }. Received: ${currVal}`
    else ret[k] = Number(currVal)
  }
  return ret
}

// OTHER //

export const isValidReaction = (reaction: any) => {
  areValidStrings({ reaction })
  if (!reactions.includes(reaction)) throw `Invalid reaction: ${reaction}`
}

export const isValidEmail = (email: any) => {
  areValidStrings({ email })

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw `Invalid email address. Recieved: ${email}`
}

export const isValidDate = (date: any, pastDatesOnly?: boolean) => {
  const dateVal = Date.parse(date)
  if (isNaN(dateVal) || (pastDatesOnly && Date.now() < dateVal))
    throw `Invalid date. Received: ${date}`
}

export const isValidUser = (user: any) => {
  const {
    fullName,
    birthdate,
    gender,
    nationalities,
    username,
    email,
    password,
  }: UserData = user

  areValidStrings({ fullName, username, email, password })

  isValidDate(birthdate, true)

  if (gender) areValidStrings({ gender })

  if (
    nationalities &&
    (!Array.isArray(nationalities) ||
      nationalities.length === 0 ||
      !nationalities.every((e) => isValidString(e)))
  ) {
    throw `Nationalities must be array of valid strings. Received: ${nationalities}`
  }

  isValidEmail(email)

  // TODO: check character limits

  // check if password is valid
}
