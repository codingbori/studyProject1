import React from "react";
import "./Header.css";

class Header extends React.Component {
  render() {
    const user = this.props.user;
    const member = user ? (
      <button onClick={() => this.props.setUser(null)}>{user.nickname}</button>
    ) : (
      <button onClick={this.props.toLogin}>로그인하세요</button>
    );

    return (
      <header id="header">
        <div id="login-out">{member}</div>
        <h1 className="header-title">싱싱감자</h1>
        <div id="search-box">
          <input type="text" placeholder="제목, 내용을 입력하세요" />
          <button type="submit">검색</button>
        </div>
      </header>
    );
  }
}

export default Header;
