export const cleanVersion = (version: string) => {
    return version.replace('^', '').replace('~', '')
}
