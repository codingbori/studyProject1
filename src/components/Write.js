import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Write.css";

const Write = () => {
  const navigate = useNavigate();
  const [p, setP] = useState({});
  const getPostId = useLocation().search;
  let postId = new URLSearchParams(getPostId).get("id");
  const dbRef = window.firebase.database().ref();

  useEffect(() => {
    const rewrite = async () => {
      const response = await dbRef.child("posts").child(postId).get();
      const datas = await response.val();
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
      const updates = {};
      updates["posts/" + postId + "/title"] = e.target.title.value;
      updates["posts/" + postId + "/text"] = e.target.text.value;
      updates["posts/" + postId + "/category"] = e.target.category.value;
      if (e.target.imageUrl.value) {
        updates["posts/" + postId + "/imageUrl"] = e.target.imageUrl.value;
      }

      dbRef.update(updates);
    } else {
      const user = JSON.parse(sessionStorage.getItem("2023user")).id;
      const time = Date.now();
      const data = {
        userid: user,
        title: e.target.title.value,
        text: e.target.text.value,
        imageUrl: [{ src: "", alt: "no-image" }],
        category: e.target.category.value,
        timeStamp: time,
        clicked: 0,
      };
      dbRef.child("posts").push().set(data);
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
