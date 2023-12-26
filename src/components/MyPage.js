import { Link, Outlet, useParams } from "react-router-dom";
import makeTableRow from "../assets/tools";
import "./MyPage.css";

const ChangePw = () => {
  const handleChangePW = async (event) => {
    event.preventDefault();
    const userID = JSON.parse(localStorage.getItem("2023user")).id;
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
  if (e.target === e.currentTarget.children[2].children[0]) {
    const userID = JSON.parse(localStorage.getItem("2023user")).id;
    fetch(`http://localhost:8000/users/${userID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: e.currentTarget.children[1].children[0].value,
      }),
    }).catch((err) => console.log(err));
  }
};

const Profile = () => {
  let { user } = useParams();
  const userdata = JSON.parse(localStorage.getItem("2023user"));
  return (
    <>
      <p className="mypage-desc">나의 프로필을 확인하고 수정할 수 있습니다.</p>
      <table className="profile-card">
        <tbody>
          <tr onClick={changeNickname}>
            <td rowSpan="2">그림1</td>
            <td>
              <input type="text" placeholder="작동하지 않음" />
            </td>
            <td>
              <button>변경하기</button>
            </td>
          </tr>
          <tr>
            <td>{userdata.email}</td>
            <td>
              <button>변경하기</button>
            </td>
          </tr>
          <tr>
            <td>
              <button>변경</button>
              <button>삭제</button>
            </td>
            <td colSpan="2">
              <Link to={"/mypage/" + user + "/changePW/"}>
                비밀번호 변경하기
              </Link>
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
