import "./Comments.css";
import { useEffect, useState } from "react";

const commentFrame = (comment, depth = 0) => {
  let isReply = "";
  if (depth) isReply = "r";
  return (
    <div className={"comment " + isReply} key={isReply + comment.id}>
      <p className="comment-user">{comment.userId}</p>
      <p className="comment-text">{comment.text}</p>
    </div>
  );
};

const Comments = () => {
  const [comments, setComments] = useState([]);

  const addComment = (e) => {
    e.preventDefault();
    const time = Date.now();
    const id = JSON.parse(localStorage.getItem("2023user")).id;
    const data = {
      id: String(time) + id,
      userId: id,
      text: e.target.comment.value,
      postId: JSON.parse(localStorage.getItem("postingNow")),
      parentId: 0,
      timeStamp: time,
    };
    e.target.comment.value = "";
    fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(setComments([...comments, data]))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const postId = JSON.parse(localStorage.getItem("postingNow"));
    async function fetchComments() {
      try {
        const response = await fetch(
          `http://localhost:8000/comments?postId=${postId}`
        );
        const datas = await response.json();
        setComments(datas);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    fetchComments();
  }, []);

  const commentList = [];
  comments.forEach((comment) => {
    if (comment.parentId === 0) {
      commentList.push(commentFrame(comment));
    } else {
      for (let i = 0; i < commentList.length; i++) {
        const c = commentList[i];
        if (Number(c.key) === Number(comment.parentId)) {
          while (commentList[i + 1]?.key[0] === "r") {
            i += 1;
          }
          commentList.splice(i + 1, 0, commentFrame(comment, 1));
          break;
        }
      }
    }
  });

  return (
    <>
      <div className="add-comment">
        <form onSubmit={addComment}>
          <textarea
            id="comment"
            name="comment"
            rows="3"
            cols="50"
            placeholder="모양만 있는 댓글작성란"
          ></textarea>
          <input type="submit" value="작성" />
        </form>
      </div>
      <div className="comments">{commentList}</div>
    </>
  );
};

export default Comments;
