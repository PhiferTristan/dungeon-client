export const getAllSkills = (token) => {
  return fetch(`http://localhost:8000/skills`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
