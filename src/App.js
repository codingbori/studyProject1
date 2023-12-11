import React from "react";
import "./App.css";
import LoginOr from "./components/LoginOr";
import Header from "./components/Header";
import Posts from "./components/Posts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toLogin: false };
    this.toLogin = this.toLogin.bind(this);
  }

  toLogin() {
    this.setState({ toLogin: !this.state.toLogin });
  }

  render() {
    const appNow = this.state.toLogin ? (
      <LoginOr toLogin={this.toLogin} />
    ) : (
      <div>
        <Header toLogin={this.toLogin} />
        <Posts />
      </div>
    );

    return <div className="App">{appNow}</div>;
  }
}

export default App;
