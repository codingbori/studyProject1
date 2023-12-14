import React from "react";
import "./LoginOr.css";
import users from "../assets/datas/userData.js";

class LoginOr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMember: true,
      forgotPw: false,
      wrongpw: false,
      membershipAlert: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleMembership = this.handleMembership.bind(this);
    this.setIsMember = this.setIsMember.bind(this);
    this.findPassword = this.findPassword.bind(this);
    this.searchPassword = this.searchPassword.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const id = event.target.id.value;
    const pw = event.target.pw.value;
    for (const user of users) {
      if (user.id === id && user.password === pw) {
        this.props.setUser(user);
        this.props.toLogin();
        return;
      }
    }

    this.setState({ wrongpw: true });
  }

  handleMembership(event) {
    event.preventDefault();
    //검증로직
    for (const user of users) {
      if (user.id === event.target.id.value) {
        this.setState({ membershipAlert: "이미 존재하는 아이디입니다" });
        return;
      }
    }
    if (event.target.pw.value !== event.target.pw2.value) {
      this.setState({ membershipAlert: "비밀번호가 일치하지 않습니다." });
      return;
    }
    //검증끝
    users[users.length] = {
      id: event.target.id.value,
      password: event.target.pw.value,
      email: event.target.email.value,
      nickname: event.target.id.value,
    };
    this.setIsMember();
  }

  setIsMember() {
    this.setState({ isMember: !this.state.isMember });
  }

  findPassword() {
    this.setState({ forgotPw: !this.state.forgotPw });
    this.setIsMember();
  }

  searchPassword(event) {
    event.preventDefault();
    for (const user of users) {
      if (
        user.id === event.target.id.value &&
        user.email === event.target.email.value
      ) {
        alert(`당신의 비밀번호는 ${user.password}입니다`);
        this.findPassword();
        return;
      }
    }
    alert("일치하는 사용자가 없습니다");
  }

  render() {
    const isMember = this.state.isMember ? (
      <form onSubmit={this.handleLogin}>
        <table>
          <tbody>
            <tr>
              <td>아이디</td>
              <td>
                <input type="text" name="id" required />
              </td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td>
                <input type="password" name="pw" required />
              </td>
            </tr>
            {this.state.wrongpw && (
              <tr>
                <td colSpan="2" className="wrong-password">
                  아이디 또는 패스워드가 틀립니다.
                </td>
              </tr>
            )}
            <tr>
              <td colSpan="2">
                <input type="submit" value="로그인하기" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    ) : this.state.forgotPw ? (
      <form onSubmit={this.searchPassword}>
        <table>
          <tbody>
            <tr>
              <td>아이디</td>
              <td>
                <input type="text" name="id" required />
              </td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>
                <input type="email" name="email" required />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <input type="submit" value="찾아보기" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    ) : (
      <form onSubmit={this.handleMembership}>
        <table>
          <tbody>
            <tr>
              <td>아이디</td>
              <td>
                <input type="text" name="id" required />
              </td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td>
                <input type="password" name="pw" required />
              </td>
            </tr>
            <tr>
              <td>비밀번호 확인</td>
              <td>
                <input type="password" name="pw2" required />
              </td>
            </tr>
            <tr>
              <td>email</td>
              <td>
                <input type="email" name="email" required />
              </td>
            </tr>
            <tr>
              <td colSpan="2">{this.state.membershipAlert}</td>
            </tr>
            <tr>
              <td colSpan="2">
                <input type="submit" value="회원가입하기" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );

    return (
      <div className="login-box">
        <h1>싱싱감자</h1>
        {isMember}
        {this.state.isMember && (
          <div>
            <div className="outer-login">
              <button style={{ background: "lightgreen" }}>네이버</button>
              <button
                style={{ background: "yellow" }}
                onClick={() =>
                  Kakao.Auth.authorize({
                    redirectUri: "https://2023community.netlify.app",
                  })
                }
              >
                카카오
              </button>
              <button style={{ background: "blue" }}>메타</button>
            </div>
            <div className="cannot-login">
              <button onClick={this.setIsMember}>회원가입</button>
              <button onClick={this.findPassword}>비밀번호 찾기</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LoginOr;
