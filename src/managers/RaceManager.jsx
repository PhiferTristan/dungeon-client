export const getAllRaces = (token) => {
    return fetch(`http://localhost:8000/races`, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
}