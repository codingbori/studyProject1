import { useNavigate } from "react-router-dom";
import "./Write.css";

const Write = (props) => {
  const p = props.p;
  const navigate = useNavigate();

  const posting = (e) => {
    e.preventDefault();
    if (p.title) {
      const data = {
        title: e.target.title.value,
        text: e.target.text.value,
        imageUrl: [],
        category: e.target.category.value,
      };

      fetch(`http://localhost:8000/posts/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch((err) => console.log(err));
    } else {
      const user = JSON.parse(localStorage.getItem("2023user")).id;
      const time = Date.now();
      const data = {
        userid: user,
        title: e.target.title.value,
        text: e.target.text.value,
        imageUrl: [],
        category: e.target.category.value,
        timeStamp: time,
        clicked: 0,
      };
      fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch((err) => console.log(err));
    }
    navigate("/");
  };

  return (
    <>
      <form className="writing-page" onSubmit={posting}>
        <div className="writing-top">
          <select
            name="category"
            id="category-select"
            defaultValue={p.category ? p.category : ""}
          >
            <option>일상</option>
            <option>정보</option>
            <option>공구</option>
          </select>
          <input
            type="text"
            name="title"
            id="writing-title"
            placeholder="제목을 입력하세요"
            defaultValue={p ? p.title : null}
            readOnly={false}
          />
        </div>
        <textarea
          name="text"
          id="writing-text"
          defaultValue={p ? p.text : null}
          readOnly={false}
        />
        <input type="submit" value="작성하기" />
      </form>
    </>
  );
};

export default Write;
