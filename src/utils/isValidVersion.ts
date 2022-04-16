export const isValidVersion = (version: string) => {
    if (!version || typeof version !== 'string' || version.length > 10) {
        return false
    }

    const parts = version.split('.')
    if (parts.length !== 3) {
        return false
    }

    const allowedCharsVers = ['^', '~']
    const allowedCharsNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const allowedCharsFirst = [...allowedCharsVers, ...allowedCharsNums]

    for (let i = 0; i < parts.length; i++) {
        const allowedChars = i === 0 ? allowedCharsFirst : allowedCharsNums
        if (parts[i].split('').some((char) => !allowedChars.includes(char))) {
            return false
        }
    }

    return true
}
