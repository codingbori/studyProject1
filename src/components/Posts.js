import React from "react";
import { Link } from "react-router-dom";
import "./Posts.css";
import posts from "../assets/datas/postData";

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
    const postList = [];
    const category = this.state.category;
    posts.forEach((post) => {
      if (category !== "전체" && category !== post.category) return;
      postList[postList.length] = (
        <section className="outer-post" key={post.id}>
          <span>{post.category}</span>
          <h4 className="outer-post-title">
            <Link
              to="/posting/"
              onClick={() => {
                window.localStorage.setItem("postingNow", post.id);
                post.clicked += 1;
              }}
            >
              {post.title}
            </Link>
          </h4>
          <span>조회수{post.clicked}</span>
        </section>
      );
    });

    return (
      <>
        <nav className="category-nav">
          <ul className="category" onClick={this.addActive}>
            <li className="active">전체</li>
            <li>일상</li>
            <li>정보</li>
            <li>공구</li>
          </ul>
        </nav>
        <main>{postList}</main>
      </>
    );
  }
}

export default Posts;
