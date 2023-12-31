export const getAllFlaws = (token) => {
    return fetch(`http://localhost:8000/flaws`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getFlawsByBackgroundId = (token, flawId) => {
    return fetch(`http://localhost:8000/flaws/?background_id=${flawId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}