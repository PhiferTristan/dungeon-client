export const getAllSavingThrows = (token) => {
    return fetch(`http://localhost:8000/saving_throws`, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
}