import React from "react";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <header id="header">
        <div id="login-out" onClick={this.props.toLogin}>
          로그인하세요
        </div>
        <h1 className="header-title">그린게시판</h1>
        <div id="search-box">
          <input type="text" placeholder="제목, 내용을 입력하세요" />
          <button type="submit">검색</button>
        </div>
      </header>
    );
  }
}

export default Header;
