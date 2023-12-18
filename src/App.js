import React from "react";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Posts from "./components/Posts";
import LoginPage from "./components/LoginPage";
import Membership from "./components/Membership";
import FindPassword from "./components/FindPassword";
import MyPage, { ChangePw } from "./components/MyPage";

class Appa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      toLogin: false,
    };
    this.setUser = this.setUser.bind(this);
    this.setToLogin = this.setToLogin.bind(this);
  }

  setUser(userObj) {
    this.setState({ user: userObj });
  }

  setToLogin() {
    this.setState({ toLogin: !this.state.toLogin });
  }

  render() {
    const appNow = this.state.toLogin ? (
      <LoginPage toLogin={this.setToLogin} setUser={this.setUser} />
    ) : (
      <div>
        <Header
          user={this.state.user}
          setUser={this.setUser}
          toLogin={this.setToLogin}
        />
        <Posts />
      </div>
    );

    return <div className="App">{appNow}</div>;
  }
}

const Home = () => {
  return (
    <>
      <Header />
      <Posts />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myPage/">
          <Route index element={<MyPage />} />
          <Route path="/myPage/changePW/" element={<ChangePw />} />
        </Route>
        <Route path="/write/" element={<h2>글쓰기 페이지</h2>} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/findpassword/" element={<FindPassword />} />
        <Route path="/membership/" element={<Membership />} />
      </Routes>
    </BrowserRouter>
  );
};
//<Route path="*" element={<Navigate to="/" replace />} />

export default App;
