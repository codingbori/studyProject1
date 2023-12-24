import { Link } from "react-router-dom";
import "./Posts.css";
import PAGE from "../assets/pagingCount";
import Paging from "./Paging";
import { useEffect, useState } from "react";

const Posts = (props) => {
  const [category, setCategory] = useState("전체");
  const [postArr, setPostArr] = useState([]);
  const [totalCount, setTotalCount] = useState(26);
  const [currentPage, setCurrentPage] = [
    props.currentPage,
    props.setCurrentPage,
  ];
  const search = props.search;
  const [sort, setSort] = useState("timeStamp");

  useEffect(() => {
    async function getTotalCount() {
      try {
        const response = search.length
          ? await fetch(`http://localhost:8000/posts?${search[0]}=${search[1]}`)
          : await fetch(
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
    props.setPost([]);
  }, [category, search]);

  //페이지 변경
  useEffect(() => {
    async function getPosts() {
      try {
        const response = props.search.length
          ? await fetch(
              `http://localhost:8000/posts?${props.search[0]}=${props.search[1]}&_page=${currentPage}&_limit=${PAGE.limit}&_sort=${sort}&_order=desc`
            )
          : await fetch(
              `http://localhost:8000/posts?${
                category === "전체" ? "" : `category=${category}`
              }&_page=${currentPage}&_limit=${
                PAGE.limit
              }&_sort=${sort}&_order=desc`
            );
        const datas = await response.json();
        setPostArr(datas);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    getPosts();
  }, [props.search, currentPage, category, sort]);

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
              props.setPost(post);
              fetch(`http://localhost:8000/posts/${post.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ clicked: post.clicked + 1 }),
              }).catch((err) => console.log(err));
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
      {!props.search.length && (
        <>
          <nav className="category-nav">
            <ul className="category" onClick={addActive}>
              <li className="active">전체</li>
              <li>일상</li>
              <li>정보</li>
              <li>공구</li>
            </ul>
          </nav>
          <button onClick={() => setSort("timeStamp")}>최신순</button>
          <button onClick={() => setSort("clicked")}>조회순</button>
        </>
      )}
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
