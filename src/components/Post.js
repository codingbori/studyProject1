import { useState } from "react";
import Comments from "./Comments";
import "./Post.css";
import { useEffect } from "react";

const Post = () => {
  const [p, setP] = useState([]);
  const postId = Number(localStorage.getItem("postingNow"));

  useEffect(() => {
    async function getPost() {
      try {
        const response = await fetch(
          `http://localhost:8000/posts?id=${postId}`
        );
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

  return (
    <>
      <article className="post">
        <h2 className="post-title">{p.title}</h2>
        <p className="post-author">{p.userid}</p>
        <p className="post-text">{p.text}</p>
        <div className="post-image">{postImages}</div>
      </article>
      <Comments />
    </>
  );
};

export default Post;
