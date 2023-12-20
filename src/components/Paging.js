import React from "react";
import "./Paging.css";
import PAGE from "../assets/pagingCount";

class Paging extends React.Component {
  constructor(props) {
    super(props);
    this.currentPageChange = this.currentPageChange.bind(this);
  }

  currentPageChange(event) {
    if (!event.target.value) return;
    this.props.setCurrentPage(event.target.value);
  }

  render() {
    const buttons = [];
    const totalCount = this.props.totalCount;
    const pageCount = PAGE.pageCount;
    const limit = PAGE.limit;
    const currentPage = this.props.currentPage;
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
      <div className="paging-box" onClick={this.currentPageChange}>
        {startPage > pageCount && (
          <button value={startPage - 1} key="prev" className="prev">
            이전
          </button>
        )}

        <div className="page-numbers">{buttons}</div>

        {totalPage > endPage && (
          <button value={endPage + 1} key="next" className="next">
            다음
          </button>
        )}
      </div>
    );
  }
}

export default Paging;

/**변수설정:
 * currentPage: 현재 페이지
 * totalCount: 총 데이터 갯수
 * pageCount: 화면에 나타날 페이지 갯수
 * limit: 한 페이지당 나타날 데이터 갯수
 */
