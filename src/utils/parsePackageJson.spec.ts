import { parsePackageJson } from './parsePackageJson'

const example1 = `
{
  "name": "yet-another-package-json-dependencies-updates-checker-backend",
  "dependencies": {
    "aaa": "1.0.0",
    "@foo/bbb": "^2.0.0",
    "@foo/ccc": "~3.0.0"
  },
  "devDependencies": {
    "@foo/mmm": "1.0.0",
    "@foo/nnn": "4.0.0",
    "@foo/ooo": "^8.0.0"
  },
  "peerDependencies": {
    "@foo/xxx": "~6.0.0",
    "@foo/yyy": "^5.0.0",
    "@foo/zzz": "2.0.0"
  }
}
`

describe('root', () => {
  it('Full package json', () => {
    expect(parsePackageJson(example1)).toEqual({
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
