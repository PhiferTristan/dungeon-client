export const getAllBonds = (token) => {
  return fetch(`http://localhost:8000/bonds`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getBondsByBackgroundId = (token, backgroundId) => {
    return fetch(`http://localhost:8000/bonds/?background_id=${backgroundId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
