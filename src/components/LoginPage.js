import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import makeTableRow from "../assets/tools.js";
import "./LoginPage.css";
import users from "../assets/datas/userData.js";

const LoginPage = () => {
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const id = event.target.id.value;
    const pw = event.target.pw.value;
    for (const user of users) {
      if (user.id === id && user.password === pw) {
        const userData = {
          id: user.id,
          nickname: user.nickname,
          email: user.email,
        };
        window.localStorage.setItem("2023user", JSON.stringify(userData));
        navigate("/");
        return;
      }
    }
    setAlert("아이디 혹은 비밀번호가 틀립니다.");
    return;
  };

  return (
    <>
      <div className="login-box">
        <h1>싱싱감자</h1>
        <form onSubmit={handleLogin}>
          <table>
            <tbody>
              {makeTableRow("아이디", "text", "id")}
              {makeTableRow("비밀번호", "password", "pw")}
              <tr className="wrong-password">
                <td colSpan="2">{alert}</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input type="submit" value="로그인하기" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <div>
          <div className="outer-login">
            <button style={{ background: "lightgreen" }}>네이버</button>
            <button
              style={{ background: "yellow" }}
              // onClick={() =>
              //   Kakao.Auth.authorize({
              //     redirectUri: "https://2023community.netlify.app",
              //   })
              // }
            >
              카카오
            </button>
            <button style={{ background: "blue" }}>메타</button>
          </div>
          <div className="cannot-login">
            <button>
              <Link to="/login/membership/">회원가입</Link>
            </button>
            <button>
              <Link to="/login/findpassword/">비밀번호 찾기</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
