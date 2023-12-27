const makeTableRow = (text, type, name) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        <input type={type} name={name} required />
      </td>
    </tr>
  );
};

const returnDate = (time) => {
  if (time < 100) return time;
  const d = new Date(time);
  const year = d.getFullYear(time);
  const month = d.getMonth(time) + 1;
  const date = d.getDate(time);

  const addZero = (num) => {
    if (num < 10) return "0" + num;
    return num;
  };

  return `${year}-${addZero(month)}-${addZero(date)}`;
};

export { makeTableRow as default, returnDate };
