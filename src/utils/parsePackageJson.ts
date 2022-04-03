import { DependencyCategory, ParseResult } from 'types'
import { getVersionType } from './getVersionType'

export const parsePackageJson = (content: string): ParseResult => {
  const info: ParseResult = {
    [DependencyCategory.dependencies]: [],
    [DependencyCategory.devDependencies]: [],
    [DependencyCategory.peerDependencies]: [],
  }

  let packageJsonObject: { [x: string]: { [x: string]: string } }

  try {
    packageJsonObject = JSON.parse(content)
  } catch {
    throw new Error('Poka')
  }

  Object.values(DependencyCategory).forEach((depType: keyof ParseResult) => {
    if (depType in packageJsonObject) {
      Object.keys(packageJsonObject[depType]).forEach((packageName: string) => {
        info[depType].push({
          name: packageName,
          versionRaw: packageJsonObject[depType][packageName],
          versionType: getVersionType(packageJsonObject[depType][packageName]),
        })
      })
    }
  })

  return info
}
