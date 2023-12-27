import "./LoginPopup.css";

const LoginPopup = (props) => {
  window.addEventListener("click", () => {
    if (props.popup) props.switch();
  });
  return (
    <div className="login-popup" onClick={(e) => e.stopPropagation()}>
      <p className="login-popup-desc">
        로그인이 필요한 서비스입니다.
        <br />
        로그인하시겠습니까?
      </p>
      <div className="login-popup-buttons">
        <button
          onClick={() => {
            props.goToLogin();
            props.switch();
          }}
        >
          예
        </button>
        <button onClick={props.switch}>아니오</button>
      </div>
    </div>
  );
};

export default LoginPopup;
