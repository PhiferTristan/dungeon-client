export const getAllAbilities = (token) => {
  return fetch(`http://localhost:8000/abilities`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
