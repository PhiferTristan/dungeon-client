export const getAllUsers = (token) => {
  return fetch("http://localhost:8000/users", {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getUserById = (token, currentUserId) => {
  return fetch(`http://localhost:8000/users/${currentUserId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
