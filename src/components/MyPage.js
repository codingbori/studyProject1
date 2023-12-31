import { Link, Outlet, useParams } from "react-router-dom";
import makeTableRow from "../assets/tools/tools";
import "./MyPage.css";

const ChangePw = () => {
  const handleChangePW = async (event) => {
    event.preventDefault();
    const userID = JSON.parse(sessionStorage.getItem("2023user")).id;
    const response = await fetch(
      `http://localhost:8000/users?id=${userID}&password=${event.target.pw.value}`
    );
    const userData = await response.json();
    if (!userData.length) {
      window.alert("비밀번호가 틀립니다.");
      return;
    } else if (event.target.pw2.value !== event.target.pw3.value) {
      window.alert("바꿀 비밀번호가 서로 다릅니다.");
      return;
    } else {
      fetch(`http://localhost:8000/users/${userID}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: event.target.pw2.value }),
      });
      window.alert("비밀번호가 변경되었습니다.");
      return;
    }
  };

  return (
    <div className="change-myinfo">
      <form onSubmit={handleChangePW}>
        <table>
          <thead>
            <tr>
              <th colSpan="2">비밀번호 변경하기</th>
            </tr>
          </thead>
          <tbody>
            {makeTableRow("현재 비밀번호", "password", "pw")}
            {makeTableRow("바꿀 비밀번호", "password", "pw2")}
            {makeTableRow("비밀번호 확인", "password", "pw3")}
            <tr>
              <td colSpan="2">
                <input type="submit" value="확인" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

const changeNickname = (e) => {
  const newNickname = document.getElementById("nickname");
  const userID = JSON.parse(sessionStorage.getItem("2023user")).id;
  fetch(`http://localhost:8000/users/${userID}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nickname: newNickname.value }),
  })
    .then((res) => res.json())
    .then((datas) => {
      window.sessionStorage.setItem("2023user", JSON.stringify(datas));
    })
    .catch((err) => console.log(err));

  window.alert("닉네임이 변경되었습니다.");
};

const Profile = () => {
  let { user } = useParams();
  const userdata = JSON.parse(sessionStorage.getItem("2023user"));
  return (
    <>
      <p className="mypage-desc">나의 프로필을 확인하고 수정할 수 있습니다.</p>
      <table className="profile-card">
        <tbody>
          <tr>
            <td rowSpan="2">기능안함</td>
            <td>
              <input
                id="nickname"
                type="text"
                defaultValue={userdata.nickname}
                readOnly={false}
              />
            </td>
            <td>
              <button id="nickname-button" onClick={changeNickname}>
                변경하기
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan="2">{userdata.email}</td>
          </tr>
          <tr>
            <td>
              <button>변경</button>
              <button>삭제</button>
            </td>
            <td colSpan="2">
              {Number.isNaN(userdata.id) ? (
                <Link to={"/mypage/" + user + "/changePW/"}>
                  비밀번호 변경하기
                </Link>
              ) : (
                <span>비밀번호 변경불가</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const MyPage = () => {
  let { user } = useParams();
  return (
    <>
      <header className="mypage-header">
        <h1 className="mypage-tohome">
          <Link to="/">싱싱감자</Link>
        </h1>
        <h2 className="mypage-title">
          <Link to={"/mypage/" + user}>내 정보</Link>
        </h2>
      </header>
      <main className="mypage-main">
        <Outlet />
      </main>
    </>
  );
};

export { Profile, ChangePw, MyPage as default };
