export const getAllBackgrounds = (token) => {
    return fetch(`http://localhost:8000/backgrounds`, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
}