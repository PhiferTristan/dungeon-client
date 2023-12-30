export const getAllParties = (token) => {
  return fetch(`http://localhost:8000/parties`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getPartyById = (token, partyId) => {
  return fetch(`http://localhost:8000/parties/${partyId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getAllPartiesByPlayerId = (token, playerId) => {
  return fetch(`http://localhost:8000/parties/?player_id=${playerId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getAllPartiesByDungeonMasterId = (token, dungeonMasterId) => {
  console.log("Fetching parties for Dungeon Master ID:", dungeonMasterId);
  return fetch(
    `http://localhost:8000/parties/?dungeon_master_id=${dungeonMasterId}`,
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
};

export const getPlayersPartiesById = (token, playerId) => {
  return fetch(
    `http://localhost:8000/parties/player/${playerId}`,
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
}

export const getDMsPartiesById = (token, dungeonMasterId) => {
  return fetch(
    `http://localhost:8000/parties/dungeon_master/${dungeonMasterId}`,
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
}

export const deletePartyById = (token, partyId) => {
  return fetch(`http://localhost:8000/parties/${partyId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const editParty = (party, partyId, token) => {
  return fetch(`http://localhost:8000/parties/${partyId}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(party),
  });
};

export const createParty = async (party, token) => {
  try {
    const response = await fetch("http://localhost:8000/parties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(party),
    });

    if (!response.ok) {
      // Handle non-OK responses here
      throw new Error("Failed to create party");
    }

    const partyObj = await response.json();
    return partyObj;
  } catch (error) {
    console.error("Error creating party:", error);
    throw error;
  }
};

export const removeCharacterFromParty = async (token, partyId, characterId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/parties/${partyId}/remove_character/${characterId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to remove player from party: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error removing player from party: ${error.message}`);
  }
};

export const leaveParty = async (token, partyId, characterId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/parties/${partyId}/leave_party/${characterId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ character_id: characterId }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to leave party: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error leaving party: ${error.message}`);
  }
};
