import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import { kakaoLogin } from "../assets/tools/Constants";

const Home = (props) => {
  const navigate = useNavigate();
  const getCode = useLocation().search;
  let code = new URLSearchParams(getCode).get("code") || null;

  useEffect(() => {
    if (!code) return;
    async function loginWithKakao() {
      try {
        //토큰을 받아요
        const bodyData = {
          grant_type: "authorization_code",
          client_id: kakaoLogin.REST_API_KEY,
          redirect_uri: kakaoLogin.Redirect_URI,
          code: code,
          client_secret: "XyWEl6O5wFnsmmA1FE5NVqmsNNoClFm1",
        };
        const queryStringBody = Object.keys(bodyData)
          .map((k) => k + "=" + bodyData[k])
          .join("&");
        const res1 = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
          body: queryStringBody,
        });
        const data1 = await res1.json();
        //사용자 정보를 받아요
        const res2 = await fetch("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${data1.access_token}`,
            "Content-type": "Content-type: application/x-www-form-urlencoded",
          },
        });
        const data2 = await res2.json();
        const id = data2.id;
        const nickname = data2.properties.nickname;
        //당신은 우리의 회원입니까?
        const res3 = await fetch(`http://localhost:8000/users/${id}`);
        const data3 = await res3.json();
        if (!data3.id) {
          window.alert("당신은 회원이 아닙니다. 강제 회원가입 진행됨.");
          const data = {
            id: id,
            password: "kakaoPassword",
            email: "tempUser@temp.com",
            nickname: nickname,
          };
          fetch("http://localhost:8000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          navigate("/login/");
        } else {
          window.sessionStorage.setItem("2023user", JSON.stringify(data3));
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
    loginWithKakao();
  }, [code]);

  return (
    <>
      <Header popup={props.popup} setPopup={props.setPopup} />
      <Outlet />
    </>
  );
};

export default Home;
