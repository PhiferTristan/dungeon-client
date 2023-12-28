export const getMostRecentCharacter = (token, player) => {
    const characters = player.characters
    if (characters && characters.length > 0) {
        return characters[0]
    }
    return null
}

export const getAllCharacters = (token) => {
    return fetch(`http://localhost:8000/characters`, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          }, 
    }).then((res) => res.json());
}