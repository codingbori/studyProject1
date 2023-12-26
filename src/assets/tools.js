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

const getNickname = async (id) => {
  return id;
  const response = await fetch(`http://localhost:8000/users/${id}`);
  const datas = await response.json();
  console.log(datas.nickname);
};

export { makeTableRow as default, getNickname };
