import { Link } from "react-router-dom";
import makeTableRow from "../assets/tools";
import users from "../assets/datas/userData";

const ChangePw = () => {
  const handleChangePW = (event) => {
    event.preventDefault();
    const userID = JSON.parse(localStorage.getItem("2023user")).id;
    for (const user of users) {
      if (userID === user.id) {
        if (event.target.pw.value !== user.password) {
          alert("비밀번호가 틀립니다.");
          return;
        } else if (event.target.pw2.value !== event.target.pw3.value) {
          alert("바꿀 비밀번호가 서로 다릅니다.");
          return;
        } else {
          user.password = event.target.pw2.value;
          alert("비밀번호가 변경되었습니다.");
          return;
        }
      }
    }
  };
  return (
    <form onSubmit={handleChangePW}>
      <table>
        <thead>
          <tr>
            <td>비밀번호 변경하기</td>
          </tr>
        </thead>
        <tbody>
          {makeTableRow("현재 비밀번호", "password", "pw")}
          {makeTableRow("바꿀 비밀번호", "password", "pw2")}
          {makeTableRow("바꿀 비밀번호 확인", "password", "pw3")}
          <tr>
            <td>
              <input type="submit" value="확인" />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

const MyPage = () => {
  const userdata = JSON.parse(localStorage.getItem("2023user"));
  return (
    <>
      <h1>내 정보</h1>
      <ul>
        <li>닉네임: {userdata.nickname}</li>
        <li>이메일: {userdata.email}</li>
        <li>
          <Link to="/myPage/changePW/">비밀번호 변경하기</Link>
        </li>
        <li>
          <button>내가 쓴 글 보기</button>
        </li>
      </ul>
    </>
  );
};

export { ChangePw, MyPage as default };
