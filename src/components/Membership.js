import { useNavigate } from "react-router-dom";
import makeTableRow from "../assets/tools/tools";
import { useState } from "react";

const Membership = () => {
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const makeMembership = async (event) => {
    event.preventDefault();
    //검증로직
    const response = await fetch(
      `http://localhost:8000/users?id=${event.target.id.value}`
    );
    const datas = await response.json();
    if (datas.length) {
      setAlert("이미 존재하는 아이디입니다");
      return;
    }
    if (event.target.pw.value !== event.target.pw2.value) {
      setAlert("비밀번호가 일치하지 않습니다.");
      return;
    }
    //검증끝
    const data = {
      id: event.target.id.value,
      password: event.target.pw.value,
      email: event.target.email.value,
      nickname: event.target.id.value,
    };
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    navigate("/login/");
    return;
  };

  return (
    <div className="login-box">
      <h1>싱싱감자</h1>
      <form onSubmit={makeMembership}>
        <table>
          <tbody>
            {makeTableRow("아이디", "text", "id")}
            {makeTableRow("비밀번호", "password", "pw")}
            {makeTableRow("비밀번호 확인", "password", "pw2")}
            {makeTableRow("email", "email", "email")}
            <tr className="wrong-password">
              <td colSpan="2">{alert}</td>
            </tr>
            <tr>
              <td colSpan="2">
                <input type="submit" value="회원가입하기" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Membership;
