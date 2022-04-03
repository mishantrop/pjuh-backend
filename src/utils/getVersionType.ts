import { VersionType } from 'types'

export const getVersionType = (version: string): VersionType => {
  if (typeof version !== 'string' || version.length === 0) {
    throw new TypeError('Invalid Version')
  }

  if (version.includes('^')) {
    return 'caret'
  }

  if (version.includes('~')) {
    return 'tilde'
  }

  return 'fixed'
}
