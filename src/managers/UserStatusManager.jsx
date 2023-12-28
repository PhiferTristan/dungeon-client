export const updateUserStatus = (token, currentUserId, newStatus) => {
  return fetch(`http://localhost:8000/users/${currentUserId}/update-status`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  })
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.error("Error:", error));
};

//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Failed to update status');
//     }
//     return response.json();
//   })
//   .then(updatedUser => updatedUser);