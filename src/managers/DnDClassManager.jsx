export const getAllDnDClasses = (token) => {
    return fetch(`http://localhost:8000/dnd_classes`, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };