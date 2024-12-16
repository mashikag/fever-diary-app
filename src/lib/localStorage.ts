export const getSelectedPersonId = () => {
  return localStorage.getItem("selectedPersonId");
};

export const setSelectedPersonId = (personId: string) => {
  localStorage.setItem("selectedPersonId", personId);
};
