import { ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Write.css";
import { useEffect, useState } from "react";

const Write = () => {
  const navigate = useNavigate();
  const [p, setP] = useState({});
  const getPostId = useLocation().search;
  let postId = new URLSearchParams(getPostId).get("id");

  useEffect(() => {
    const rewrite = async () => {
      const response = await fetch(`http://localhost:8000/posts/${postId}`);
      const datas = await response.json();
      setP(datas);
    };
    if (postId) {
      rewrite();
    }
  }, []);

  const posting = (e) => {
    e.preventDefault();
    if (!e.target.title.value || !e.target.text.value) {
      window.alert("제목 및 내용을 입력하세요");
      return;
    }

    if (postId) {
      const data = {
        title: e.target.title.value,
        text: e.target.text.value,
        imageUrl: [],
        category: e.target.category.value,
      };
      fetch(`http://localhost:8000/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch((err) => console.log(err));
    } else {
      const user = JSON.parse(sessionStorage.getItem("2023user")).id;
      const time = Date.now();
      const data = {
        userid: user,
        title: e.target.title.value,
        text: e.target.text.value,
        imageUrl: [],
        category: e.target.category.value,
        timeStamp: time,
        clicked: 0,
      };
      fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch((err) => console.log(err));
    }
    window.alert(`${postId ? "수정" : "작성"}되었습니다.`);
    navigate("/");
  };

  return (
    <>
      <form className="writing-page" onSubmit={posting}>
        <div className="writing-top">
          <select
            name="category"
            id="category-select"
            defaultValue={postId ? p.category : ""}
          >
            <option>일상</option>
            <option>정보</option>
            <option>공구</option>
          </select>
          <input
            type="text"
            name="title"
            id="writing-title"
            placeholder="제목을 입력하세요"
            defaultValue={postId ? p.title : null}
            readOnly={false}
          />
        </div>
        <textarea
          name="text"
          id="writing-text"
          defaultValue={postId ? p.text : null}
          readOnly={false}
        />
        <input type="submit" value={postId ? "수정하기" : "작성하기"} />
        <input type="submit" value="취소하기" onClick={() => navigate("/")} />
      </form>
    </>
  );
};

export default Write;
