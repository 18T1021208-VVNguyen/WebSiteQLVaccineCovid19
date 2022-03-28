import React from "react";
import { FaUndo, FaRegCheckCircle } from "react-icons/fa";
import "../../Style/Admin/CategoryAdmin.css"
import { useState,useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import CategoryService from "../../services/admin/CategoryService";
import isEmpty from "validator/lib/isEmpty"


const Quanlyloaivacxin = (props) => {

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false)

  const [validationMsg, setValidationMsg] = useState({});

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      CategoryService.CategoryById(id)
        .then((res) => {
          setCode(res.data.code);
          setName(res.data.name);
        })
        .catch((error) => {
          console.log("Create User Fail", error);
        });
    }
  }, []);
  console.log(useEffect);


  const onChangeName = (e) => {
    const value = e.target.value;
    setName(value);
  }
  
  const validAll = () => {
    const msg = {};
    if (isEmpty(code)) {
      msg.code = "Mã loại vaccine không được để trống";
    }
    if (isEmpty(name)) {
      msg.name = "Tên loại vaccine không được để trống";
    }
    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  const onSubmitUpdate = () => {
    setMessage("");
    const isValid = validAll();
    if (!isValid) {
      return;
    } else {
      const category = { id, code, name };
      CategoryService.updateCategory(category)
        .then((response) => {
          setMessage(response.data);
          setSuccessful(true);
          console.log(message);
          alert('Update thành công!');
          history.push("/quan-ly-loai-vacxin-index");
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
    history.push("/quan-ly-loai-vacxin-index")
  }
  return (
    <>
      <div className="container1">
        <h2 className="header-name1"> Sửa loại vacxin </h2>
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
        <form>
          <div className="form-input-vacxin1">
            <div className="vacxin-input1">
              <p>
                Mã loại vacxin <b className="key-important">(*):</b>
              </p>
              <input
                type="text"
                value={code}
                className="ma-input1 info-loai-vacxin1"
                
                readOnly
              />
            </div>

            <div className="vacxin-input1">
              <p>
                Tên loại vacxin <b className="key-important">(*):</b>
              </p>
              <input type="text" 
              value={name}
              className="ma-input1 info-loai-vacxin1" onChange={onChangeName} />
              <p
                style={{ fontSize: "0.8rem", paddingTop: "5px",color:"red" }}
              >
                      {validationMsg.name}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="btn-vacxin1">
            <button type="reset" className="reset-btn1 btn-format1 "   onClick={onQuayLai}>
              <FaUndo />
              <i  className="text-btn1"  >Quay lại</i>
            </button>
            <button className="update-btn1 btn-format1" type="button">
            <FaRegCheckCircle />
              <i className="text-btn1" onClick={onSubmitUpdate}>Cập nhật</i>
            </button>
          </div>
      
        </form>
      </div>
    </>
  );
}
export default Quanlyloaivacxin;