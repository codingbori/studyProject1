import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LoginPopup from "./LoginPopup";
import { KakaoLogin } from "../assets/tools/Constants";
import "./Header.css";

const Header = (props) => {
  //카카오 로그인에 미친 사람
  const getToken = useLocation().search;
  let code = new URLSearchParams(getToken).get("code") || null;

  useEffect(() => {
    async function LoginWithKakao() {
      if (!code) return;
      try {
        const bodyData = {
          grant_type: "authorization_code",
          client_id: KakaoLogin.REST_API_key,
          redirect_uri: KakaoLogin.Redirect_URI,
          code: code,
          client_secret: "XyWEl6O5wFnsmmA1FE5NVqmsNNoClFm1",
        };
        const queryStringBody = Object.keys(bodyData)
          .map((k) => encodeURIComponent(k) + "=" + encodeURI(bodyData[k]))
          .join("&");
        console.log(queryStringBody);
        const res1 = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
          body: queryStringBody,
        });
        const tokens = await res1.json();
        const ACCESS_TOKEN = tokens["access_token"];
        /**사용자 정보 가져오기*/
        const res2 = await fetch("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-type": "Content-type: application/x-www-form-urlencoded",
          },
        });
        const userInfo = await res2.json();
        console.log(userInfo.id, userInfo.properties.nickname);
      } catch (err) {
        console.log(err);
      }
    }
    LoginWithKakao();
  }, [code]);

  //(끝)카카오 로그인에 미친 사람

  let postId = new URLSearchParams(getToken).get("id");
  let pageNum = new URLSearchParams(getToken).get("page");
  const user = JSON.parse(localStorage.getItem("2023user"));
  let { searched, userid } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState("전체");
  const [islogin, setIslogin] = useState(Boolean(user));

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
            setIslogin(false);
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
    if (!e.target.search.value) return;
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

  const goToLogin = () => {
    navigate("/login/", {
      state: `${pathname}${postId ? `?id=${postId}` : ""}${
        pageNum ? `?page=${pageNum}` : ""
      }`,
    });
  };

  return (
    <>
      <header id="header">
        {props.popup && (
          <LoginPopup
            popup={props.popup}
            switch={props.setPopup}
            goToLogin={goToLogin}
          />
        )}
        <div id="login-out">
          <div
            className="button-home"
            onClick={() => {
              navigate("/");
            }}
          >
            홈
          </div>
          {!islogin && <button onClick={goToLogin}>로그인하세요</button>}
          {islogin && (
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
            onClick={(e) => {
              e.stopPropagation();
              if (islogin) {
                navigate("/write/");
              } else {
                props.setPopup();
              }
            }}
          >
            글쓰기
          </button>
          <form onSubmit={searchText}>
            <input
              type="text"
              name="search"
              placeholder="제목 또는 내용을 입력하세요"
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
