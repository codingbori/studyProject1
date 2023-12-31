import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PAGE } from "../assets/tools/Constants";
import { returnDate } from "../assets/tools/tools";
import Paging from "./Paging";
import "./Posts.css";

const Posts = () => {
  const getPage = useLocation().search;
  let currentPage = new URLSearchParams(getPage).get("page") || 1;
  const navigate = useNavigate();
  let { category, searched, userid } = useParams();
  const [searchResult, setSearchResult] = useState([]);
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

  //totalCount찾기
  useEffect(() => {
    if (searched) return;
    async function getTotalCount() {
      try {
        const response = await fetch(
          `http://localhost:8000/posts?${
            category ? `category=${category}` : ""
          }${userid ? `userid=${userid}` : ""}`
        );
        const datas = await response.json();
        setTotalCount(datas.length);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    getTotalCount();
  }, [category, userid, searched]);

  //페이지 변경
  useEffect(() => {
    if (searched) return;
    async function getPosts() {
      try {
        const response = await fetch(
          `http://localhost:8000/posts?${
            category ? `category=${category}` : ""
          }${userid ? `userid=${userid}` : ""}&_page=${currentPage}&_limit=${
            PAGE.limit
          }&_sort=${sort}&_order=desc`
        );
        const datas = await response.json();

        //각 포스트의 댓글수도 여기서 구하도록 합시다.
        for (let i = 0; i < datas.length; i++) {
          const res2 = await fetch(
            `http://localhost:8000/comments?postId=${datas[i].id}`
          );
          const data2 = await res2.json();
          datas[i].commentNum = data2.length;
        }
        setPostArr(datas);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    getPosts();
  }, [category, userid, currentPage, sort, searched]);

  //search특수
  useEffect(() => {
    if (!searched) return;
    const jsonOut = async (title) => {
      const response = await fetch(
        `http://localhost:8000/posts?${title}_like=${searched}`
      );
      const datas = await response.json();
      //각 포스트의 댓글수도 여기서 구하도록 합시다.
      for (let i = 0; i < datas.length; i++) {
        const res2 = await fetch(
          `http://localhost:8000/comments?postId=${datas[i].id}`
        );
        const data2 = await res2.json();
        datas[i].commentNum = data2.length;
      }
      return datas;
    };
    const uniqueOut = (arr) => {
      const unique = [];
      const ids = [];
      arr.map((obj) => {
        if (!ids.includes(obj.id)) {
          ids.push(obj.id);
          unique.push(obj);
        }
      });
      return unique;
    };
    Promise.all([jsonOut("title"), jsonOut("text")]).then(([title, text]) => {
      const unique = uniqueOut([...title, ...text]);
      unique.sort((x, y) => y[sort] - x[sort]);
      setSearchResult(unique);
      setTotalCount(unique.length);
    });
  }, [searched, sort]);
  //search특수2
  useEffect(() => {
    if (!searched) return;
    const arr = [];
    for (
      let i = (currentPage - 1) * PAGE.limit;
      i < Math.min(currentPage * PAGE.limit, searchResult.length);
      i++
    ) {
      arr.push(searchResult[i]);
    }
    setPostArr(arr);
  }, [searchResult, currentPage, sort]);

  const makeSection = (post) => {
    return (
      <section
        className="outer-post"
        key={post.id}
        onClick={() => {
          navigate("/posts?id=" + post.id);
        }}
      >
        <p className="outer-post-category">{post.category}</p>
        <h4 className="outer-post-title">
          {post.title}
          <span className="comment-number">{post.commentNum}</span>
        </h4>
        <p className="post-date">{returnDate(post.timeStamp)}</p>
      </section>
    );
  };

  const postList = [];
  postArr.map((obj) => {
    postList.push(makeSection(obj));
  });
  if (!postArr.length) {
    postList.push(<div>포스팅이 없습니다</div>);
  }

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
