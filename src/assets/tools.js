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

export default makeTableRow;
