import reactions from '../tson/reactions'

const isValidString = (str: any) =>
  typeof str === 'string' && str.trim().length !== 0

export const areValidStrings = (data: { [key: string]: any }) => {
  for (const k in data)
    if (!isValidString(data[k]))
      throw `${k} must be a non-empty string. Received: ${data[k]}`
}

export const areValidNumbers = (data: { [key: string]: any }) => {
  for (const k in data)
    if (typeof data[k] !== 'number' || isNaN(data[k]))
      throw `${k} must be a valid number. Received: ${data[k]}`
}

// OTHER //

export const isValidReaction = (reaction: any) => {
  areValidStrings({ reaction })
  if (!reactions.includes(reaction)) throw `Invalid reaction: ${reaction}`
}

export const isValidEmail = (email: any) => {
  if (
    typeof email !== 'string' ||
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  )
    throw `Invalid email. Received: ${email}`
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
