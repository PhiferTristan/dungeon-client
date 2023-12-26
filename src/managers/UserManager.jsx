export const getAllUsers = (token) => {
  return fetch("http://localhost:8000/users", {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
};

export const getUserById = (token, userId) => {
    return fetch(`http://localhost:8000/users/${userId}`, {
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
}
