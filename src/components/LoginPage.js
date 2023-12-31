import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import makeTableRow from "../assets/tools/tools";
import { kakaoLogin } from "../assets/tools/Constants";
import "./LoginPage.css";

const LoginPage = () => {
  const { state } = useLocation();
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const id = event.target.id.value;
    const pw = event.target.pw.value;
    try {
      const response = await fetch(
        `http://localhost:8000/users?id=${id}&password=${pw}`
      );
      const datas = await response.json();
      if (!datas.length) {
        setAlert("아이디 혹은 비밀번호가 틀립니다.");
      } else {
        window.sessionStorage.setItem("2023user", JSON.stringify(datas[0]));
        if (state) {
          navigate(state);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  function loginWithkakao() {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoLogin.JavaScript_KEY);
      console.log("kakao is initialized");
    }
    window.Kakao.Auth.authorize({
      redirectUri: kakaoLogin.Redirect_URI,
    });
  }

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
            <button style={{ background: "yellow" }} onClick={loginWithkakao}>
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
