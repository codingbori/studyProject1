import "./Comments.css";
import { useEffect, useState } from "react";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [commentNum, setCommentNum] = useState(0);
  const postId = props.postId;
  const parentId = props.parentId;
  const depth = props.depth;
  const id = JSON.parse(localStorage.getItem("2023user")).id;

  const addComment = (e) => {
    e.preventDefault();
    const time = Date.now();
    const data = {
      userId: id,
      text: e.target.comment.value,
      postId: postId,
      parentId: parentId,
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
    async function fetchComments() {
      try {
        const response = await fetch(
          `http://localhost:8000/comments?postId=${postId}&parentId=${parentId}`
        );
        const datas = await response.json();
        setComments(datas);
        setCommentNum(datas.length);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    if (depth < 2) {
      fetchComments();
    }
  }, []);

  const deleteComment = (e) => {
    fetch(`http://localhost:8000/comments/${e.target.value}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).catch((err) => console.log(err));
    window.alert("댓글이 삭제되었습니다.");
    fetch(
      `http://localhost:8000/comments?postId=${postId}&parentId=${parentId}`
    )
      .then((response) => response.json())
      .then((datas) => setComments(datas))
      .catch((err) => console.log(err));
  };

  const commentList = [];
  comments.forEach((comment) => {
    commentList.push(
      <div className="comment" key={comment.id}>
        <p className="comment-user">{comment.userId}</p>
        <p className="comment-text">{comment.text}</p>
        {comment.userId === id && (
          <button onClick={deleteComment} value={comment.id}>
            삭제하기
          </button>
        )}
        <Comments postId={postId} parentId={comment.id} depth={depth + 1} />
      </div>
    );
  });

  const addActive = (e) => {
    const target = e.target.parentNode.children[1].classList;
    if (target.contains("active")) {
      target.remove("active");
    } else {
      target.add("active");
    }
  };

  return (
    <>
      <div className="comments-area">
        {depth === 1 && <button onClick={addActive}>답글({commentNum})</button>}
        <div className={`comments-box ${depth ? "reply" : ""}`}>
          {depth < 2 && (
            <form onSubmit={addComment} className="add-comment">
              <textarea
                id="comment"
                name="comment"
                rows="3"
                cols="50"
                placeholder="댓글을 작성하세요"
              ></textarea>
              <input type="submit" value="작성" />
            </form>
          )}
          <div className="commentList">{commentList}</div>
        </div>
      </div>
    </>
  );
};

export default Comments;
