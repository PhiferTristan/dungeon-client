export const getAllAlignments = (token) => {
    return fetch(`http://localhost:8000/alignments`, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
}