import { Link } from "react-router-dom";
import "./Posts.css";
import PAGE from "../assets/pagingCount";
import Paging from "./Paging";
import { useEffect, useState } from "react";

const Posts = () => {
  const [category, setCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [postArr, setPostArr] = useState([]);
  const [totalCount, setTotalCount] = useState(26);

  useEffect(() => {
    async function getTotalCount() {
      try {
        const response = await fetch(
          `http://localhost:8000/posts?${
            category === "전체" ? "" : `category=${category}`
          }`
        );
        const datas = await response.json();
        setTotalCount(datas.length);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    getTotalCount();
  }, [category]);

  //페이지 변경
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch(
          `http://localhost:8000/posts?${
            category === "전체" ? "" : `category=${category}`
          }&_page=${currentPage}&_limit=${PAGE.limit}`
        );
        const datas = await response.json();
        setPostArr(datas);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    getPosts();
  }, [currentPage, category]);

  const addActive = (e) => {
    if (e.target.innerText === category) return;
    setCategory(e.target.innerText);
    setCurrentPage(1);
    for (const child of e.currentTarget.children) {
      child.className = "";
    }
    e.target.className = "active";
  };

  const makeSection = (post) => {
    return (
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
  };

  const postList = [];
  postArr.map((obj) => {
    postList.push(makeSection(obj));
  });

  return (
    <>
      <nav className="category-nav">
        <ul className="category" onClick={addActive}>
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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </footer>
    </>
  );
};

export default Posts;
