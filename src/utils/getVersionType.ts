import { VersionType } from 'types'

export const getVersionType = (version: string): VersionType => {
  if (typeof version !== 'string' || version.length === 0) {
    throw new TypeError('Invalid Version Value')
  }

  if (version.includes('^')) {
    return 'caret'
  }

  if (version.includes('~')) {
    return 'tilde'
  }

  return 'fixed'
}

export const getVersionPrefix = (versionType: VersionType): string => {
  if (typeof versionType !== 'string' || versionType.length === 0) {
    throw new TypeError('Invalid Version Type')
  }

  if (versionType === 'caret') {
    return '^'
  }

  if (versionType === 'tilde') {
    return '~'
  }

  return ''
}
