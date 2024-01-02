import { useEffect, useState } from "react";
import { returnDate } from "../assets/tools/tools";
import "./Comments.css";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [commentNum, setCommentNum] = useState(0);
  const postId = props.postId;
  const parentId = props.parentId;
  const depth = props.depth;
  const id = JSON.parse(sessionStorage.getItem("2023user"))?.id || false;
  const dbRef = window.firebase.database().ref();

  useEffect(() => {
    async function fetchComments() {
      try {
        //클라이언트가 2차필터를 돌린다.
        function filterParentId(obj) {
          var result = [];
          Object.keys(obj).forEach((key) => {
            if (obj[key].parentId === parentId) {
              result.push({
                id: result[key],
                ...obj[key],
              });
            }
          });
          return result;
        }

        const res1 = await dbRef
          .child("comments")
          .orderByChild("postId")
          .equalTo(postId)
          .once("value");
        const datas = filterParentId(await res1.val());
        for (let i = 0; i < datas.length; i++) {
          const res2 = await dbRef.child("users").child(datas[i].userId);
          const data2 = await res2.val();
          datas[i].nickname = data2.nickname;
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
      const res1 = await dbRef.child("comments").push(data).key;
      //닉네임을 붙여요
      const res2 = await dbRef.child("users").child(data.userId);
      const data2 = await res2.val();
      data.id = res1;
      data.nickname = data2.nickname;
      setComments([...comments, data]);
      setCommentNum(commentNum + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (e) => {
    //하위 댓글이 있는지 찾아봅시다
    const res1 = await dbRef
      .child("comments")
      .orderByChild("parentId")
      .equalTo(e.target.value)
      .once("value");
    const datas1 = await res1.val();
    try {
      if (datas1) {
        const updates = {};
        updates["comments/" + e.target.value + "/userId"] = null;
        updates["comments/" + e.target.value + "/text"] = null;
        dbRef.update(updates);
      } else {
        window.firebase.database().ref(`comments/${e.target.value}`).remove();
      }
    } catch (err) {
      console.log(err);
    }
    window.alert("댓글이 삭제되었습니다.");

    //갯수가 줄어든 댓글창 업데이트
    const newComments = [];
    comments.forEach((comment) => {
      if (comment.id === e.target.value) {
        newComments[newComments.length] = {
          id: e.target.value,
          userId: "",
          text: "",
          postId: postId,
          parentId: parentId,
          timeStamp: "",
        };
      } else {
        newComments[newComments.length] = comment;
      }
    });
    setComments(newComments);
    setCommentNum(commentNum - 1);
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
