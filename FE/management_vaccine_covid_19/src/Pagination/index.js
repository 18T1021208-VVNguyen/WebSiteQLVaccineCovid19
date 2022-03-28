import React from "react";
import PropTypes from "prop-types";

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};
Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props) {
  const { pagination, onPageChange } = props;
  const { _page, _limit, totalItems, currentPage } = pagination;
  const totalPages = Math.ceil(totalItems / _limit);

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }

  const arrayPhanTrang = () => {
    let array = [];
    for (let i = 1; i <= totalPages; i++) {
      array.push(i);
    }

    return array;
  };
  return (
    <>
      <ul className="pagination justify-content-center">
        <li>
          <button
            onClick={() => handlePageChange(_page - 1)}
            class={ currentPage+1<=1? "disabled btn-dark button" : "btn-primary button"}
          >
            Pre
          </button>
        </li>
        {arrayPhanTrang().map((ele) => (
           
          <li key={ele}>
            <button
              onClick={() => handlePageChange(ele)}
              class={currentPage+1 === ele? "btn-success active button" : "btn-danger button"}
            >
              {ele}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={_page >= totalPages}
            onClick={() => handlePageChange(_page + 1)}
            class={
              currentPage >= totalPages - 1 ? "disabled btn-dark button" : "btn-primary button"
            }
          >
            Next
          </button>
        </li>
      </ul>
    </>

    // <div className="d-flex justify-content-center">
    //   <button
    //     disabled={_page <= 1}
    //     onClick={() => handlePageChange(_page - 1)}
    //     class="btn btn-primary"
    //     style={{ width: "100px", marginRight: "10px" }}
    //   >
    //     Pre
    //   </button>

    //   <button
    //     disabled={_page >= totalPages}
    //     onClick={() => handlePageChange(_page + 1)}
    //     class="btn btn-secondary"
    //     style={{ width: "100px" }}
    //   >
    //     Next
    //   </button>
    // </div>
  );
}

export default Pagination;