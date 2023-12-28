export const getMostRecentCharacter = (token, player) => {
    const characters = player.characters
    if (characters && characters.length > 0) {
        return characters[0]
    }
    return null
}