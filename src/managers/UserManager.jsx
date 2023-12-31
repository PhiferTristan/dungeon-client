export const getAllUsers = (token) => {
  return fetch("http://localhost:8000/users", {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getUserByCurrentUserId = (token, currentUserId) => {
  return fetch(`http://localhost:8000/users/${currentUserId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getUserById = (token, userId) => {
  return fetch(`http://localhost:8000/users/${userId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const updateUserProfile = (token, currentUserId, updatedUserData) => {
  return fetch(`http://localhost:8000/users/${currentUserId}/update`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUserData),
  });
};

export const deleteUserById = (token, currentUserId) => {
  return fetch(`http://localhost:8000/users/${currentUserId}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
