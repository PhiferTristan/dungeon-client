export const getAllIdeals = (token) => {
    return fetch(`http://localhost:8000/ideals`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getIdealsByBackgroundId = (token, idealId) => {
    return fetch(`http://localhost:8000/ideals/?background_id=${idealId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}