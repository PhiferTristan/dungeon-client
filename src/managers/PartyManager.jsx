export const getAllParties = (token) => {
    return fetch(`http://localhost:8000/parties`, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
}

export const getPartyById = (token, partyId) => {
    return fetch(`http://localhost:8000/parties/${partyId}`, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json"
        }
    }).then((res) => res.json())
}