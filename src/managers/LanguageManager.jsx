export const getAllLanguages = (token) => {
    return fetch(`http://localhost:8000/languages`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};