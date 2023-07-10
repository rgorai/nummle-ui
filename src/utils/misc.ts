import { APP_NAME } from './env'

export const setDocumentTitle = (...args: string[]) => {
  document.title = `${args.reduce(
    (p, c) => `${p} ${p !== '' ? '|' : ''} ${c}`,
    ''
  )} | ${APP_NAME}`
}
