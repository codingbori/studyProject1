import { useEffect, useState } from "react";
import { returnDate } from "../assets/tools";
import "./Comments.css";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [commentNum, setCommentNum] = useState(0);
  const postId = props.postId;
  const parentId = props.parentId;
  const depth = props.depth;
  const id = JSON.parse(localStorage.getItem("2023user"))?.id || false;

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(
          `http://localhost:8000/comments?postId=${postId}&parentId=${parentId}`
        );
        const datas = await response.json();
        for (let i = 0; i < datas.length; i++) {
          const res = await fetch(
            `http://localhost:8000/users/${datas[i].userId}`
          );
          const userData = await res.json();
          datas[i].nickname = userData.nickname;
        }
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

  const addComment = async (e) => {
    e.preventDefault();
    if (!id) {
      props.setPopup();
      return;
    } else if (!e.target.comment.value) {
      window.alert("내용을 쓰세요");
      return;
    }

    const time = Date.now();
    const data = {
      userId: id,
      text: e.target.comment.value,
      postId: postId,
      parentId: parentId,
      timeStamp: time,
    };
    e.target.comment.value = "";
    try {
      const res = await fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const datas = await res.json();
      //닉네임을 붙여요
      const res2 = await fetch(`http://localhost:8000/users/${datas.userId}`);
      const data2 = await res2.json();
      datas.nickname = data2.nickname;
      setComments([...comments, datas]);
      setCommentNum(commentNum + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (e) => {
    //하위 댓글이 있는지 찾아봅시다
    const res1 = await fetch(
      `http://localhost:8000/comments?parentId=${e.target.value}`
    );
    const datas1 = await res1.json();
    const under = datas1.length;

    try {
      if (under) {
        fetch(`http://localhost:8000/comments/${e.target.value}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: null,
            text: null,
          }),
        });
      } else {
        fetch(`http://localhost:8000/comments/${e.target.value}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
      }
    } catch (err) {
      console.log(err);
    }
    window.alert("댓글이 삭제되었습니다.");

    //갯수가 줄어든 댓글창 업데이트
    try {
      const res2 = await fetch(
        `http://localhost:8000/comments?postId=${postId}&parentId=${parentId}`
      );
      const datas2 = await res2.json();
      setComments(datas2);
      setCommentNum(commentNum - 1);
    } catch (err) {
      console.log(err);
    }
  };

  const commentList = [];
  comments.forEach((comment) => {
    commentList.push(
      <div className={`comment ${!comment.text && `deleted`}`} key={comment.id}>
        <div className="comment-owner">
          <p className="comment-user">
            {comment.nickname}
            &#40;{comment.userId}&#41;
          </p>
          {comment.userId === id && (
            <button onClick={deleteComment} value={comment.id}>
              삭제하기
            </button>
          )}
          <p className="post-date">{returnDate(comment.timeStamp)}</p>
        </div>
        <p className="comment-text">{comment.text}</p>
        <Comments
          postId={postId}
          parentId={comment.id}
          depth={depth + 1}
          setPopup={props.setPopup}
        />
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
