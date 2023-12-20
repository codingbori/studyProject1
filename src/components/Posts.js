import React from "react";
import { Link } from "react-router-dom";
import "./Posts.css";
import PAGE from "../assets/pagingCount";
import Paging from "./Paging";
import posts from "../assets/datas/postData";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "전체",
      currentPage: 1,
    };
    this.addActive = this.addActive.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  setCurrentPage(num) {
    this.setState({ currentPage: num });
  }

  addActive(e) {
    if (e.target.innerText === this.state.category) return;
    this.setState({ category: e.target.innerText, currentPage: 1 });
    for (const child of e.currentTarget.children) {
      child.className = "";
    }
    e.target.className = "active";
  }

  render() {
    const limit = PAGE.limit;
    const postList = [];
    const category = this.state.category;
    let countStartPost = (this.state.currentPage - 1) * limit;

    let totalCount = 0;
    for (const post of posts) {
      if (category !== "전체" && category !== post.category) continue;
      if (countStartPost > 0) {
        countStartPost -= 1;
        totalCount += 1;
        continue;
      }
      if (postList.length >= limit) {
        totalCount += 1;
        continue;
      }
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
    }

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
        <main className="post-main">{postList}</main>
        <footer className="paging">
          <Paging
            totalCount={totalCount}
            currentPage={this.state.currentPage}
            setCurrentPage={this.setCurrentPage}
          />
        </footer>
      </>
    );
  }
}

export default Posts;
