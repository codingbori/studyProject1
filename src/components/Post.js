import Comments from "./Comments";
import "./Post.css";
import posts from "../assets/datas/postData";
import { type } from "os";
const Post = () => {
  const postId = Number(localStorage.getItem("postingNow"));

  async function logJSONData() {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const jsonData = await response.json();
      console.log("type: " + typeof jsonData);
      console.log(jsonData);
    } catch (err) {
      console.log(err);
    }
  }

  logJSONData();

  // const postImages = [];
  // if (p.imageUrl) {
  //   p.imageUrl.forEach((obj, index) => {
  //     postImages.push(<img src={obj.src} alt={obj.alt} key={index} />);
  //   });
  // }

  return (
    <>
      <article className="post">
        <h2 className="post-title">p.title</h2>
        <p className="post-author">p.userid</p>
        <p className="post-text">p.text</p>
        {/* <div className="post-image">{postImages}</div> */}
      </article>
      <Comments />
    </>
  );
};

export default Post;
