import Comments from "./Comments";
import "./Post.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Post = (props) => {
  const navigate = useNavigate();
  const [p, setP] = [props.post, props.setPost];
  const user = JSON.parse(localStorage.getItem("2023user")).id;

  useEffect(() => {
    async function getPost() {
      try {
        const response = await fetch(`http://localhost:8000/posts?id=${p.id}`);
        const datas = await response.json();
        setP(datas[0]);
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
    navigate("/write/");
  };

  const deletePost = () => {
    fetch(`http://localhost:8000/posts/${p.id}`, {
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
      <Comments postId={p.id} parentId="0" depth={0} />
    </>
  );
};

export default Post;
