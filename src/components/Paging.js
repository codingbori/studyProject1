import React from "react";
import "./Paging.css";
import PAGE from "../assets/pagingCount";
import { useNavigate } from "react-router-dom";

const Paging = (props) => {
  const navigate = useNavigate();
  const currentPageChange = (event) => {
    if (!event.target.value) return;
    navigate("?page=" + event.target.value);
  };

  const buttons = [];
  const totalCount = props.totalCount;
  const pageCount = PAGE.pageCount;
  const currentPage = props.currentPage;
  const limit = PAGE.limit;
  /**
   * 총 페이지 수 = Math.ceil(totalCount/limit)
   * 시작버튼은 몇 번이죠? Math.floor(currentPage/pageCount) + 1
   * 이전 버튼 있나요? 시작버튼 > pageCount
   * 이전 버튼을 누르면 어디로 가나요? 시작버튼 - 1
   * 다음 버튼 있나요? 총 페이지 수 > Math.ceil(currentPage/pageCount) * pageCount
   * 다음 버튼을 누르면 어디로 가나요? Math.ceil(currentPage/pageCount) * pageCount + 1
   */

  const totalPage = Math.ceil(totalCount / limit);
  const startPage = (Math.ceil(currentPage / pageCount) - 1) * 5 + 1;
  const endPage = Math.ceil(currentPage / pageCount) * pageCount;
  for (let i = startPage; i < startPage + pageCount; i++) {
    if (i > totalPage) break;
    const now = i === Number(currentPage) ? "active" : "";
    const button = (
      <button className={now} value={i} key={i}>
        {i}
      </button>
    );
    buttons.push(button);
  }

  return (
    <div className="paging-box" onClick={currentPageChange}>
      <button
        value={startPage - 1}
        key="prev"
        className={startPage > pageCount ? "prev" : "prev hidden"}
      >
        이전
      </button>
      <div className="page-numbers">{buttons}</div>
      <button
        value={endPage + 1}
        key="next"
        className={totalPage > endPage ? "next" : "next hidden"}
      >
        다음
      </button>
    </div>
  );
};

export default Paging;
