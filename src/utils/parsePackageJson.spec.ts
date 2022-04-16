import { example } from './packageJsonExampe'
import { parsePackageJson } from './parsePackageJson'

describe('root', () => {
    it('Full package json', () => {
        expect(parsePackageJson(example)).toEqual({
            dependencies: [
                {
                    name: 'aaa',
                    before: {
                        fixed: '1.0.0',
                        raw: '1.0.0',
                        versionType: '',
                    },
                    after: {},
                },
                {
                    name: '@foo/bbb',
                    before: {
                        fixed: '2.0.0',
                        raw: '^2.0.0',
                        versionType: '^',
                    },
                    after: {},
                },
                {
                    name: '@foo/ccc',
                    before: {
                        fixed: '3.0.0',
                        raw: '~3.0.0',
                        versionType: '~',
                    },
                    after: {},
                },
            ],
            devDependencies: [
                {
                    name: '@foo/mmm',
                    before: {
                        fixed: '1.0.0',
                        raw: '1.0.0',
                        versionType: '',
                    },
                    after: {},
                },
                {
                    name: '@foo/nnn',
                    before: {
                        fixed: '4.0.0',
                        raw: '4.0.0',
                        versionType: '',
                    },
                    after: {},
                },
                {
                    name: '@foo/ooo',
                    before: {
                        fixed: '8.0.0',
                        raw: '^8.0.0',
                        versionType: '^',
                    },
                    after: {},
                },
            ],
            peerDependencies: [
                {
                    name: '@foo/xxx',
                    before: {
                        fixed: '6.0.0',
                        raw: '~6.0.0',
                        versionType: '~',
                    },
                    after: {},
                },
                {
                    name: '@foo/yyy',
                    before: {
                        fixed: '5.0.0',
                        raw: '^5.0.0',
                        versionType: '^',
                    },
                    after: {},
                },
                {
                    name: '@foo/zzz',
                    before: {
                        fixed: '2.0.0',
                        raw: '2.0.0',
                        versionType: '',
                    },
                    after: {},
                },
            ],
        })
    })
})
