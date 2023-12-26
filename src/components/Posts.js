import { Link, useLocation, useParams } from "react-router-dom";
import "./Posts.css";
import PAGE from "../assets/pagingCount";
import Paging from "./Paging";
import { useEffect, useState } from "react";

const Posts = () => {
  let { category, searched, userid } = useParams();
  const getPage = useLocation().search;
  let currentPage = new URLSearchParams(getPage).get("page") || 1;

  const [postArr, setPostArr] = useState([]);
  const [totalCount, setTotalCount] = useState(26);
  const [sort, setSort] = useState("timeStamp");

  const setSortAnd = (e) => {
    if (!e.target.value) return;
    for (const child of e.currentTarget.children) {
      child.className = "";
    }
    setSort(e.target.value);
    e.target.className = "active";
  };

  useEffect(() => {
    async function getTotalCount() {
      try {
        const response = searched
          ? await fetch(`http://localhost:8000/posts?text_like=${searched}`)
          : await fetch(
              `http://localhost:8000/posts?${
                category ? `category=${category}` : ""
              }${userid ? `userid=${userid}` : ""}
              `
            );
        const datas = await response.json();
        setTotalCount(datas.length);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    getTotalCount();
  }, [category, searched, userid]);

  //페이지 변경
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch(
          `http://localhost:8000/posts?${
            category ? `category=${category}` : ""
          }${searched ? `text_like=${searched}` : ""}${
            userid ? `userid=${userid}` : ""
          }&_page=${currentPage}&_limit=${PAGE.limit}&_sort=${sort}&_order=desc`
        );
        const datas = await response.json();
        setPostArr(datas);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    getPosts();
  }, [category, searched, userid, currentPage, sort]);

  const makeSection = (post) => {
    return (
      <section className="outer-post" key={post.id}>
        <span>{post.category}</span>
        <h4 className="outer-post-title">
          <Link to={"/posts?id=" + post.id}>{post.title}</Link>
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
      <div className="sort-button" onClick={setSortAnd}>
        <button value="timeStamp" className="active">
          최신순
        </button>
        <button value="clicked">조회순</button>
      </div>
      <main className="post-main">{postList}</main>
      <footer className="paging">
        <Paging totalCount={totalCount} currentPage={currentPage} />
      </footer>
    </>
  );
};

export default Posts;
