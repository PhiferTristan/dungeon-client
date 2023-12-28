export const getAllPlayers = (token) => {
    return fetch(`http://localhost:8000/players`, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
}

export const getPlayerByPlayerId = (token, PlayerId) => {
    return fetch(`http://localhost:8000/players/${PlayerId}`, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
}