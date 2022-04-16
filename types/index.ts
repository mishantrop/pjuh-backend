export enum DependencyCategory {
  dependencies = 'dependencies',
  devDependencies = 'devDependencies',
  peerDependencies = 'peerDependencies',
}

export type VersionType = '' | '^' | '~'

export type Package = {
  name: string

  before: {
    fixed: string
    raw: string
    versionType: VersionType
  }

  after: {
    latest?: string
    latestFixed?: string
    semver?: string
    semverFixed?: string
  }

  error?: {
    code: 'invalid_version' | 'not_found'
  }
}

export type ParseResult = {
  dependencies: Package[]
  devDependencies: Package[]
  peerDependencies: Package[]
}

export type Version = {
  major: number
  minor: number
  patch: number
}
