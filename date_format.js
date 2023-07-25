function formatDate(date) {
  const parts = date.split("-");
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
}
module.exports = formatDate;
