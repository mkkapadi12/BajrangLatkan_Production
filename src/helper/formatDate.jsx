export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
