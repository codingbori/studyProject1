import Comments from "./Comments";
import "./Post.css";
import posts from "../assets/datas/postData";
const Post = () => {
  const postId = Number(localStorage.getItem("postingNow"));
  let p = null;
  for (const post of posts) {
    if (postId === post.id) {
      p = post;
      break;
    }
  }

  const postImages = [];
  if (p.imageUrl) {
    p.imageUrl.map((obj, index) => {
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
