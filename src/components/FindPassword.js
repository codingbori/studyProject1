import { useNavigate } from "react-router-dom";
import makeTableRow from "../assets/tools/tools";
import { useState } from "react";

const FindPassword = () => {
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const searchPassword = async (event) => {
    event.preventDefault();
    window.firebase
      .database()
      .ref()
      .child("users")
      .child(event.target.id.value)
      .get()
      .then((snapshot) => {
        if (
          snapshot.exists() &&
          snapshot.val().email === event.target.email.value
        ) {
          window.alert(`당신의 비밀번호는 ${snapshot.val().password}입니다`);
          navigate("/login/");
        } else {
          setAlert("일치하는 사용자가 없습니다");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return;
  };

  return (
    <div className="login-box">
      <h1>비밀번호 찾기</h1>
      <form onSubmit={searchPassword}>
        <table>
          <tbody>
            {makeTableRow("아이디", "text", "id")}
            {makeTableRow("email", "email", "email")}
            <tr className="wrong-password">
              <td colSpan="2">{alert}</td>
            </tr>
            <tr>
              <td colSpan="2">
                <input type="submit" value="찾아보기" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FindPassword;
