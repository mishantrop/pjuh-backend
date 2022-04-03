export enum DependencyCategory {
  dependencies = 'dependencies',
  devDependencies = 'devDependencies',
  peerDependencies = 'peerDependencies',
}

export type VersionType = 'fixed' | 'caret' | 'tilde'

export type Package = {
  name: string
  versionRaw: string
  versionType: VersionType
}

export type ParseResult = {
  dependencies: Package[]
  devDependencies: Package[]
  peerDependencies: Package[]
}
