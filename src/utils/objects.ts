export const getObjValueFromKeychain = (
  source: any,
  keychain: string[]
): any =>
  !source
    ? undefined
    : keychain.length === 0
      ? source
      : getObjValueFromKeychain(source[keychain[0]], keychain.slice(1))

// returns new object with set value
export const setObjValueFromKeychain = (
  source: { [_: string | number]: any },
  keychain: string | string[],
  value: any
): any => {
  const key = typeof keychain === 'string' ? keychain : keychain[0]
  return {
    ...source,
    [key]:
      typeof keychain === 'string' || keychain.length === 1
        ? value
        : setObjValueFromKeychain(source[key] ?? {}, keychain.slice(1), value),
  }
}
