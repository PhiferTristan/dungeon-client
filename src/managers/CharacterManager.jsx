export const getMostRecentCharacter = (token, player) => {
  const characters = player?.characters;
  if (characters && characters.length > 0) {
    return characters[characters.length - 1];
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

export const getAllPlayersCharacterById = (token, playerId) => {
  return fetch(`http://localhost:8000/characters/player/${playerId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getAllCharactersByPlayerId = (token, playerId) => {
  return fetch(`http://localhost:8000/characters/?player_id=${playerId}`, {
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

export const editCharacter = (character, characterId, token) => {
  const url = `http://localhost:8000/characters/${characterId}`;

  return fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(character),
  })
    .then((response) => response.json())
    .then((data) => {
      // Process the data as needed
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export const createCharacter = (token, characterObj) => {
  return fetch(`http://localhost:8000/characters`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterObj),
  }).then((res) => res.json());
};
