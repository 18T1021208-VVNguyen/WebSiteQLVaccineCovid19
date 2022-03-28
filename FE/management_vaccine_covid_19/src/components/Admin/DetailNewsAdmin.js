import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import PublicService from "../../services/PublicService";
function DetailNewsAdmin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const [validationMsg, setValidationMsg] = useState({});

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      PublicService.detailNewsById(id)
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setContent(res.data.content);
        })
        .catch((error) => {
          console.log("Create User Fail", error);
        });
    }
  }, []);

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

  const handelDeleteNew = () => {
    PublicService.deleteById(id)
      .then((response) => {
        setMessage(response.data);
        setSuccessful(true);
        console.log(message);
        alert("Xóa thành công");
        history.push("/admin-news");
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

  const handelUpdateNew = () => {
    setMessage("");
    const isValid = validAll();
    if (!isValid) {
      return;
    } else {
      const news = { id, title, description, content };
      PublicService.updateNews(news)
        .then((response) => {
          setMessage(response.data);
          setSuccessful(true);
          console.log(message);
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

  const onQuayLai=()=>{
    history.push("/admin-news")
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
                <div className="col-md-6" style={{ height: "100px" }}>
                  <label className="label">
                    Tiêu đề <span className="text-danger">(*)</span>
                  </label>
                  <textarea
                    type="text"
                    className="form-control h-100"
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
                <div className="col-md-6" style={{ height: "100px" }}>
                  <label className="label">
                    Mô tả ngắn <span className="text-danger">(*)</span>
                  </label>
                  <textarea
                    type="text"
                    className="form-control h-100"
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
              <div className="row mt-5">
                <div className="col-md-6" style={{ height: "240px" }}>
                  <label className="label">
                    Nội dung <span className="text-danger">(*)</span>
                  </label>
                  <textarea
                    type="text"
                    className="form-control h-100 "
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
              <div className="mt-5 d-flex justify-content-end mr-5">
                <button className="btn btn-primary " type="button" onClick={onQuayLai}>
                  {" "}
                  Quay lai
                </button>
                <button
                  className="btn btn-success ml-2"
                  type="button"
                  onClick={handelUpdateNew}
                >
                  Cap nhat
                </button>
                <button
                  className="btn btn-danger ml-2"
                  type="button"
                  onClick={handelDeleteNew}
                >
                  Xoa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DetailNewsAdmin;