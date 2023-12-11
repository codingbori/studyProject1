import React from "react";
import "./LoginOr.css";

class LoginOr extends React.Component {
  constructor(props) {
    super(props);
    this.state = { member: true };
    this.imNotMember = this.imNotMember.bind(this);
  }

  imNotMember() {
    this.setState({ member: false });
  }

  render() {
    let loginOr = this.state.member ? (
      <div className="login-box">
        <form action="./login.do" method="get">
          <label htmlFor="userid">
            아이디&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          <input type="text" id="userid" name="id" />
          <br />
          <label htmlFor="password">비밀번호&nbsp;&nbsp;</label>
          <input type="password" id="password" name="pw" />
          <br />
          <button type="submit">로그인하기</button>
        </form>
        <div className="outer-login">
          <button style={{ background: "lightgreen" }}>네이버</button>
          <button style={{ background: "yellow" }}>카카오</button>
          <button style={{ background: "blue" }}>메타</button>
        </div>
        <div className="cannot-login">
          <button onClick={this.imNotMember}>회원가입</button>
          <button>비밀번호 찾기</button>
        </div>
      </div>
    ) : (
      <div className="login-box">
        <form method="get">
          <label htmlFor="userid">
            아이디&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          <input type="text" id="userid" name="id" />
          <br />
          <label htmlFor="password">비밀번호&nbsp;&nbsp;</label>
          <input type="password" id="password" name="pw" />
          <br />
          <label htmlFor="password2">비밀번호 확인&nbsp;</label>
          <input type="password" id="password2" name="pw2" />
          <br />
          <label htmlFor="nickname">닉네임&nbsp;&nbsp;&nbsp;</label>
          <input type="text" id="nickname" name="nickname" />
          <br />
          <button type="submit">가입하기</button>
        </form>
      </div>
    );

    return loginOr;
  }
}

export default LoginOr;
