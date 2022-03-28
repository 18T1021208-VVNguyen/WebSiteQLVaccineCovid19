import { useEffect, useState } from "react";
import "../Style/New.css";
import Pagination from "../Pagination";
import queryString from "query-string";
import { Link } from "react-router-dom";

function Home() {
  const [newLists, setNewLists] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
  });

 

  useEffect(() => {
    async function fetchNewList() {
      try {
        const paramString = queryString.stringify(filters);
        const requestUrl = `http://localhost:8080/congthongtin/news?${paramString}`;
        const response = await fetch(requestUrl);
        console.log("reponse",response);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { listnews, _limit, _page, totalItems,currentPage } = responseJSON;
        setNewLists(listnews);
        const pagina = { _limit, _page, totalItems ,currentPage};
        setPagination(pagina);
      } catch (error) {
        console.log("Failed to fetch post list", error.message);
      }
    }
    console.log("New list effect");
    fetchNewList();
  }, [filters]);

  function handlePageChange(newPage) {
    console.log("newPage" + newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  return (
    <>
      <div>
        <h5 className="well font-weight-bold text-primary tieudecss">
          TRANG CHỦ
        </h5>
        <ul className="list-group ">
          {newLists.map((post) => (
            <li key={post.id} className="list-group-item newcss">
              <Link to={`detailnew/${post.id}`} style={{ fontSize: "1.1rem" }}>
                {post.title}
              </Link>
              <br />
              <span style={{ fontSize: "0.8rem" }}>{post.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </>
  );
}

export default Home;