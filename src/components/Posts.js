import React from "react";
import "./Posts.css";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: "전체" };
    this.addActive = this.addActive.bind(this);
  }

  addActive(e) {
    if (e.target.innerText === this.state.category) return;
    this.setState({ category: e.target.innerText });
    for (const child of e.currentTarget.children) {
      child.className = "";
    }
    e.target.className = "active";
  }

  render() {
    return (
      <main>
        <ul className="category" onClick={this.addActive}>
          <li className="active">전체</li>
          <li>일상</li>
          <li>정보</li>
          <li>공구</li>
        </ul>
      </main>
    );
  }
}

export default Posts;
