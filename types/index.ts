export enum DependencyCategory {
    dependencies = 'dependencies',
    devDependencies = 'devDependencies',
    peerDependencies = 'peerDependencies',
    optionalDependencies = 'optionalDependencies',
}

export type UpdateMode = 'SEMVER' | 'LATEST' | 'LATEST_FIXED'
export type VersionType = '' | '^' | '~'
export type DependencyType = 'prod' | 'dev' | 'peer' | 'optional'

export type Package = {
    name: string

    meta: {
        updateMode: UpdateMode
        type: DependencyType
        isUpdating: boolean
    }

    before: {
        fixed: string
        raw: string
        versionType: VersionType
    }

    after: {
        latest?: string
        latestFixed?: string
        semver?: string
        // semverFixed?: string
    }

    error?: {
        code: 'invalid_version' | 'not_found'
    }
}

export type ParseResult = {
    allDependencies: Package[]
}

export type Version = {
    major: number
    minor: number
    patch: number
}
