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

  const [tab, setTab] = useState(1);
  const [[fireFirst, fireLast], setFirePage] = useState([]);
  const [fireDatas, setFireData] = useState({});

  useEffect(() => {
    if (currentPage > tab * 5) {
      setTab(tab + 1);
    } else if (currentPage <= (tab - 1) * 5) {
      setTab(tab - 1);
    }
  }, [currentPage]);

  //totalCount찾기 && 페이지데이터를 세팅
  useEffect(() => {
    if (searched) return;
    const getTotalCount = async () => {
      try {
        const dbRef = window.firebase
          .database()
          .ref("posts")
          .orderByKey()
          .limitToLast(PAGE.limit * PAGE.pageCount + 1);
        function returnValue() {
          if (currentPage % PAGE.pageCount === PAGE.pageCount - 1) {
            return dbRef.startAfter(fireFirst).once("value");
          } else if (fireLast) {
            return dbRef.endAt(fireLast).once("value");
          } else {
            return dbRef.once("value");
          }
        }

        const res = await returnValue();
        setFireData(await res.val());
        const dataIds = Object.keys(fireDatas);
        setFirePage([dataIds[dataIds.length - 1], dataIds[0]]);
        setTotalCount(dataIds.length + (tab - 1) * 5);
      } catch (err) {
        console.log(err);
      }
    };
    getTotalCount();
  }, [tab]);

  //보여주는 페이지 변경
  useEffect(() => {
    if (searched) return;
    async function getPosts() {
      try {
        const postDataList = [];
        const newCurrentPage = currentPage % PAGE.pageCount;
        Object.keys(fireDatas).forEach((data, index) => {
          if (
            index >= (newCurrentPage - 1) * PAGE.limit &&
            index < newCurrentPage * PAGE.limit
          ) {
            postDataList.push({
              id: data,
              ...fireDatas[data],
            });
          }
        });
        //각 포스트의 댓글수
        for (let i = 0; i < postDataList.length; i++) {
          const res = await window.firebase
            .database()
            .ref("comments")
            .orderByChild("postId")
            .equalTo(postDataList[i].id)
            .once("value");
          postDataList[i].commentNum = Object.keys(await res.val()).length;
        }
        setPostArr(postDataList);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    getPosts();
  }, [fireDatas, currentPage, sort, searched]);

  const setSortAnd = (e) => {
    if (!e.target.value) return;
    for (const child of e.currentTarget.children) {
      child.className = "";
    }
    setSort(e.target.value);
    e.target.className = "active";
  };

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
        <Paging
          totalCount={totalCount}
          currentPage={currentPage}
          setTab={setTab}
        />
      </footer>
    </>
  );
};

export default Posts;
