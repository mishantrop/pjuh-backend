import { example } from './packageJsonExampe'
import { parsePackageJson } from './parsePackageJson'

describe('root', () => {
  it('Full package json', () => {
    expect(parsePackageJson(example)).toEqual({
      dependencies: [
        { name: 'aaa', versionRaw: '1.0.0', versionType: 'fixed' },
        { name: '@foo/bbb', versionRaw: '^2.0.0', versionType: 'caret' },
        { name: '@foo/ccc', versionRaw: '~3.0.0', versionType: 'tilde' },
      ],
      devDependencies: [
        { name: '@foo/mmm', versionRaw: '1.0.0', versionType: 'fixed' },
        { name: '@foo/nnn', versionRaw: '4.0.0', versionType: 'fixed' },
        { name: '@foo/ooo', versionRaw: '^8.0.0', versionType: 'caret' },
      ],
      peerDependencies: [
        { name: '@foo/xxx', versionRaw: '~6.0.0', versionType: 'tilde' },
        { name: '@foo/yyy', versionRaw: '^5.0.0', versionType: 'caret' },
        { name: '@foo/zzz', versionRaw: '2.0.0', versionType: 'fixed' },
      ],
    })
  })
})
