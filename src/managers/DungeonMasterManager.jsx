export const getAllDungeonMasters = (token) => {
    return fetch(`http://localhost:8000/dungeon_masters`, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
}

export const getDungeonMasterById = (token, dungeonMasterId) => {
    return fetch(`http://localhost:8000/dungeon_masters/${dungeonMasterId}`, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
}