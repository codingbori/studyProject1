import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("2023user"));
  const [person, changePerson] = useState(user);
  const choice = () => {
    const userbox = document.getElementsByClassName("user-info-box")[0];
    userbox.classList.add("active");
    window.addEventListener("click", () => {
      userbox.classList.remove("active");
    });
    return;
  };

  const UserInfo = () => {
    return (
      <div
        className="user-info-box"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>{user.nickname}</h2>
        <p>{user.email}</p>
        <button>
          <Link to="/myPage/">계정 관리</Link>
        </button>
        <button
          onClick={() => {
            window.localStorage.setItem("2023user", null);
            props.setSearch([]);
            props.setCurrentPage(1);
            changePerson(null);
          }}
        >
          로그아웃
        </button>
        <button
          onClick={() => {
            props.setSearch(["userid", user.id]);
            props.setCurrentPage(1);
          }}
        >
          내가 쓴 글 보기
        </button>
      </div>
    );
  };

  const searchText = (e) => {
    e.preventDefault();
    props.setSearch(["text_like", e.target.search.value]);
    props.setCurrentPage(1);
    e.target.search.value = "";
    navigate("/");
  };

  return (
    <>
      <header id="header">
        <div id="login-out">
          <div
            className="button-home"
            onClick={() => {
              props.setSearch([]);
              props.setCurrentPage(1);
              navigate("/");
            }}
          >
            A
          </div>
          {!person && (
            <button
              onClick={() => {
                navigate("/login/", { state: pathname });
              }}
            >
              로그인하세요
            </button>
          )}
          {person && (
            <>
              <button
                onClick={(e) => {
                  choice();
                  e.stopPropagation();
                }}
              >
                {user.nickname}님
              </button>
              <UserInfo name={user.nickname} email={user.email} />
            </>
          )}
        </div>
        <h1 className="header-title">싱싱감자</h1>
        <div id="search-box">
          <form onSubmit={searchText}>
            <input
              type="text"
              name="search"
              placeholder="제목, 내용을 입력하세요"
            />
            <button type="submit">검색</button>
          </form>
        </div>
      </header>
    </>
  );
};

export default Header;
