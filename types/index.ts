export enum DependencyCategory {
  dependencies = 'dependencies',
  devDependencies = 'devDependencies',
  peerDependencies = 'peerDependencies',
}

export type VersionType = 'fixed' | 'caret' | 'tilde'

export type Package = {
  name: string

  before: {
    versionFixed: string
    versionRaw: string
    versionType: VersionType
  }

  after: {
    versionRaw?: string
    versionFixed?: string
  }
}

export type ParseResult = {
  dependencies: Package[]
  devDependencies: Package[]
  peerDependencies: Package[]
}
