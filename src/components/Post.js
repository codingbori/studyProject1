import Comments from "./Comments";
import "./Post.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Post = (props) => {
  const getPostId = useLocation().search;
  let postId = new URLSearchParams(getPostId).get("id");
  const navigate = useNavigate();
  const [p, setP] = useState({
    id: "Temp",
    title: "Temp",
    text: "Temp",
    imageUrl: [],
  });
  const [nick, setNick] = useState("user");
  const user = JSON.parse(localStorage.getItem("2023user"))?.id || null;

  useEffect(() => {
    async function getPost() {
      try {
        //데이터를 받아요
        const response = await fetch(`http://localhost:8000/posts/${postId}`);
        const datas = await response.json();
        setP(datas);
        //닉네임을 바꿔요
        fetch(`http://localhost:8000/users/${datas.userid}`)
          .then((res) => res.json())
          .then((data) => setNick(data.nickname));
        //조회수를 늘려요
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

  const textLines = [];
  const lineArr = p.text.split("\n");
  lineArr.forEach((line) => {
    textLines.push(<p className="post-text">{line}</p>);
  });

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
        <p className="post-author">{nick}</p>
        {textLines}
        <div className="post-image">{postImages}</div>
        {p.userid === user && (
          <>
            <button onClick={revise}>수정하기</button>
            <button onClick={deletePost}>삭제하기</button>
          </>
        )}
      </article>
      <Comments
        postId={postId}
        parentId="0"
        depth={0}
        setPopup={props.setPopup}
      />
    </>
  );
};

export default Post;
