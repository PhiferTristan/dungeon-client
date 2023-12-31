export const getAllPersonalityTraits = (token) => {
    return fetch(`http://localhost:8000/personality_traits`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getPersonalityTraitsByBackgroundId = (token, personalityTraitId) => {
    return fetch(`http://localhost:8000/personality_traits/?background_id=${personalityTraitId}`, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}