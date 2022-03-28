import React, { useState } from "react";

import queryString from "query-string";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import Pagination from "../../Pagination";
import PublicService from "../../services/PublicService";
import isEmpty from "validator/lib/isEmpty";

function NewsAdmin() {
  const [newLists, setNewLists] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const [validationMsg, setValidationMsg] = useState({});

  const history = useHistory();

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 5,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 5,
  });

  const onChangeTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  const onChangeDescription = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const onChangeContent = (e) => {
    const value = e.target.value;
    setContent(value);
  };

  const validAll = () => {
    const msg = {};
    if (isEmpty(title)) {
      msg.title = "Tiêu đề không được để trống";
    }
    if (isEmpty(description)) {
      msg.description = "Mô tả ngắn không được để trống";
    }
    if (isEmpty(content)) {
      msg.content = "Nội dung không được để trống";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  async function fetchNewList() {
    try {
      const paramString = queryString.stringify(filters);
      const requestUrl = PublicService.newListAdmin(paramString);
      console.log("requestUrl", (await requestUrl).data);
      const response = (await requestUrl).data;
      console.log("reponse", response);
      const { listnews, _limit, _page, totalItems, currentPage } = response;
      setNewLists(listnews);
      const pagina = { _limit, _page, totalItems, currentPage };
      setPagination(pagina);
    } catch (error) {
      console.log("Failed to fetch post list", error.message);
    }
  }
  useEffect(() => {
    const user = PublicService.getCurrentUser();
    if (user.roles.includes("ROLE_ADMIN")) {
      console.log("New list effect");
      fetchNewList();
    } else {
      history.push("/");
    }
  }, [filters]);

  function handlePageChange(newPage) {
    console.log("newPage" + newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  const onInsertNews = () => {
    setMessage("");
    const isValid = validAll();
    if (!isValid) {
      return;
    } else {
      const news = { title, description, content };
      console.log(news);

      PublicService.insertNewsAdmin(news)
        .then((response) => {
          setMessage(response.data);
          setSuccessful(true);
          console.log(message);
          fetchNewList()
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            setMessage(error.response.data);
            setSuccessful(false);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
  };


  const onRefesh =()=>{
    setTitle("")
    setDescription("")
    setContent("")
  }

  return (
    <>
      <h5 className="well font-weight-bold text-primary">QUẢN LÍ TIN TỨC</h5>
      {message && (
        <div className="form-group">
          <p
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
          >
            {message}
          </p>
        </div>
      )}
      <div className="container-fluid rounded bg-white ps-2">
        <div className="row">
          <div className="col-md-12 ">
            <div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="label">
                    Tiêu đề <span className="text-danger">(*)</span>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={onChangeTitle}
                  />
                  <p
                    className="text-danger font-italic"
                    style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                  >
                    {validationMsg.title}
                  </p>
                </div>
                <div className="col-md-6">
                  <label className="label">
                    Mô tả ngắn <span className="text-danger">(*)</span>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={onChangeDescription}
                  />
                  <p
                    className="text-danger font-italic"
                    style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                  >
                    {validationMsg.description}
                  </p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="label">
                    Nội dung <span className="text-danger">(*)</span>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={content}
                    onChange={onChangeContent}
                  />
                  <p
                    className="text-danger font-italic"
                    style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                  >
                    {validationMsg.content}
                  </p>
                </div>
              </div>
              <div className="mt-5 d-flex justify-content-center">
                <button
                  className="btn btn-dark "
                  type="button"
                  style={{ marginRight: "10px" }}
                  onClick={onRefesh}
                >
                  Nhập lại
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={onInsertNews}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid" style={{ marginTop: "50px" }}>
        <table class="table table-bordered text-center">
          <thead class="thead-info bg-info">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tiêu đề</th>
              <th scope="col">Mô tả ngắn</th>
              <th scope="col">Nội dung</th>
              <th scope="col">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {newLists.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td className="w-25">
                  <p className="text-left textcss">{post.title}</p>
                </td>
                <td className="w-25">
                  <p className="text-left textcss">{post.description}</p>
                </td>
                <td className="w-25">
                  {" "}
                  <p className="text-left textcss">{post.content}</p>
                </td>
                <td>
                  <Link to={`/admin/detailnew/${post.id}`}>xem</Link>
                </td>
              </tr>
            ))}

            {/* <tr>
              <td>1</td>
              <td className="w-25">
                <p className="text-left textcss">
                  {" "}
                  For left, right, and center alignment, responsive classes are
                  available that use the same viewport width breakpoints as the
                  grid system.For left, right, and center alignment, responsive
                  classes are available that use the same viewport width
                  breakpoints as the grid system.For left, right, and center
                  alignment, responsive classes are available that use the same
                  viewport width breakpoints as the grid system
                </p>
              </td>
              <td className="w-25">Otto</td>
              <td className="w-25">@mdo</td>
              <td className="text-center">
                <Link to={""}>xem</Link>
              </td>
            </tr> */}
          </tbody>
        </table>

        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </>
  );
}
export default NewsAdmin;