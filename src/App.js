import React from "react";
import "./App.css";
import LoginOr from "./components/LoginOr";
import Header from "./components/Header";
import Posts from "./components/Posts";

class App extends React.Component {
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
      <LoginOr toLogin={this.setToLogin} setUser={this.setUser} />
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

export default App;
