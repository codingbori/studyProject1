import "./Comments.css";
import comments from "../assets/datas/commentData";

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
  const addComment = (e) => {
    e.preventDefault();
    console.log(e.target.comment.value);
  };

  const postId = JSON.parse(localStorage.getItem("postingNow"));
  const commentList = [];
  comments.forEach((comment) => {
    if (comment.postId === postId) {
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
