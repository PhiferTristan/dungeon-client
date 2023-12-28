export const getMostRecentCharacter = (token, player) => {
  const characters = player.characters;
  if (characters && characters.length > 0) {
    return characters[0];
  }
  return null;
};

export const getAllCharacters = (token) => {
  return fetch(`http://localhost:8000/characters`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getCharacterById = (token, characterId) => {
  return fetch(`http://localhost:8000/characters/${characterId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const deleteCharacter = (token, characterId) => {
  return fetch(`http://localhost:8000/characters/${characterId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
