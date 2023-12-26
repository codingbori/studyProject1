import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./Header.css";

//person 어따쓰냐 애매하다.
const Header = () => {
  let { searched, userid } = useParams();
  const [category, setCategory] = useState("전체");
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
          <Link to={"/mypage/" + user.id}>계정 관리</Link>
        </button>
        <button
          onClick={() => {
            window.localStorage.setItem("2023user", null);
            changePerson(null);
          }}
        >
          로그아웃
        </button>
        <button
          onClick={() => {
            navigate("/mypost/" + user.id);
          }}
        >
          내가 쓴 글 보기
        </button>
      </div>
    );
  };

  const searchText = (e) => {
    e.preventDefault();
    navigate("/search/" + e.target.search.value);
  };

  const addActive = (e) => {
    if (e.target.innerText === category) return;
    setCategory(e.target.innerText);
    for (const child of e.currentTarget.children) {
      child.className = "";
    }
    e.target.className = "active";

    if (e.target.innerText === "전체") {
      navigate("/");
    } else {
      navigate(e.target.innerText);
    }
  };

  return (
    <>
      <header id="header">
        <div id="login-out">
          <div
            className="button-home"
            onClick={() => {
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
          <button
            className="write"
            onClick={() => {
              navigate("/write/");
            }}
          >
            글쓰기
          </button>
          <form onSubmit={searchText}>
            <input
              type="text"
              name="search"
              placeholder="제목, 내용을 입력하세요"
              className="search-input"
            />
            <button type="submit">검색</button>
          </form>
        </div>
      </header>
      {!(userid || searched) && (
        <nav className="category-nav">
          <ul className="category" onClick={addActive}>
            <li className="active">전체</li>
            <li>일상</li>
            <li>정보</li>
            <li>공구</li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Header;
