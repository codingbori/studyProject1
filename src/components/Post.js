import Comments from "./Comments";
import "./Post.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Post = () => {
  const getPostId = useLocation().search;
  let postId = new URLSearchParams(getPostId).get("id");
  const navigate = useNavigate();
  const [p, setP] = useState({
    id: "임시아이디",
    userid: "임시유저",
    title: "임시타이틀",
    text: "임시텍스트",
    imageUrl: [],
    category: "임시카테",
    timeStamp: "000000",
    clicked: "000000",
  });
  const user = JSON.parse(localStorage.getItem("2023user")).id;

  useEffect(() => {
    async function getPost() {
      try {
        const response = await fetch(`http://localhost:8000/posts/${postId}`);
        const datas = await response.json();
        setP(datas);
        fetch(`http://localhost:8000/posts/${postId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clicked: datas.clicked + 1 }),
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    getPost();
  }, []);

  const postImages = [];
  if (p.imageUrl) {
    p.imageUrl.forEach((obj, index) => {
      postImages.push(<img src={obj.src} alt={obj.alt} key={index} />);
    });
  }

  const revise = () => {
    navigate("/write?id=" + postId);
  };

  const deletePost = () => {
    fetch(`http://localhost:8000/posts/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).catch((err) => console.log(err));
    window.alert("삭제되었습니다.");
    navigate("/");
  };

  return (
    <>
      <article className="post">
        <h2 className="post-title">{p.title}</h2>
        <p className="post-author">{p.userid}</p>
        <p className="post-text">{p.text}</p>
        <div className="post-image">{postImages}</div>
        {p.userid === user && (
          <>
            <button onClick={revise}>수정하기</button>
            <button onClick={deletePost}>삭제하기</button>
          </>
        )}
      </article>
      <Comments postId={postId} parentId="0" depth={0} />
    </>
  );
};

export default Post;
