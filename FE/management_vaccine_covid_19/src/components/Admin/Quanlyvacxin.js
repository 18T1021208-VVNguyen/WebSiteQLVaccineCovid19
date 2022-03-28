import React, { useState,useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty"
import { FaUndo, FaRegCheckCircle } from "react-icons/fa";
import "../../Style/Admin/Vaccine.css"
import VaccineService from "../../services/admin/VaccineService";

const Quanlyvacxin = (props) => {
  const [listData,setListData] = useState();
  const [code, setCode] = useState("");
  const [categoryVaccineID, setCategoryVaccineID] = useState("");
  const [name, setName] = useState("");
  const [exprirationDate, setExprirationDate] = useState("");
  const [producer, setProducer] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [successful, setSuccessful] = useState(false)
  const [validationMsg, setValidationMsg] = useState({});

  const { id } = useParams();


  useEffect(() => {
    if (id) {
      VaccineService.VaccineById(id)
        .then((res) => {
          setCode(res.data.code);
          setCategoryVaccineID(res.data.categoryVaccineID);
          setName(res.data.name);
          setExprirationDate(res.data.exprirationDate);
          setProducer(res.data.producer);
          setDescription(res.data.description);
        })
        .catch((error) => {
          console.log("Create User Fail", error);
        });
    }
  }, []);
  const onChangeCategory = (e) => {
    const value = e.target.value;
    setCategoryVaccineID(value);
  };

  const onChangeName = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const onChangeDay = (e) => {
    const value = e.target.value;
    setExprirationDate(value);
  };

  const onChangeProducer = (e) => {
    const value = e.target.value;
    setProducer(value);
  };
  const onChangeDescription = (e) => {
    const value = e.target.value;
    setDescription(value);
  };
  const validAll = () => {
    const msg = {};
    if (isEmpty(name)) {
      msg.name = "Tên vaccine không được để trống";
    }
    if (isEmpty(exprirationDate)) {
      msg.day = "Ngày hết hạn không được để trống";
    }
    if (isEmpty(producer)) {
      msg.producer = "Nhà sản xuất không được để trống";
    }
    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  const getData = () =>{
    VaccineService.getData()
    .then((response) =>{
      setListData(response.data);
      console.log(response.data);
    })
  }
  
  useEffect(()=>{
    // lấy dữ liệu    
      getData()    
           
  },[])
  const onSubmitUpdate = () => {
    setMessage("");
    const isValid = validAll();
    if (!isValid) {
      return;
    } else {
      const vaccine = { id, code,categoryVaccineID, name,exprirationDate,producer,description };
      VaccineService.updateVaccine(vaccine)
        .then((response) => {
          setMessage(response.data);
          setSuccessful(true);
          console.log(message);
          alert('Update thành công!');
          history.push("/quan-ly-vacxin-index");
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
    history.push("/admin/vaccine")
  }

  return (
    <div className="container1">
      <h2 className="header-name1"> Sửa thông tin vacxin </h2>
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
        <div className="form-input1">
          <div className="infomation-input1">
            <p>
              Mã vacxin <b className="important">(*):</b>
            </p>
            <input
              type="text"
              className="ma-input1 info-vacxin1"
              value={code}
              readOnly
            />
          </div>
          <div className="infomation-input1">
            <p>
              Loại vacxin <b className="important">(*):</b>
            </p>
            <form className="category-vacxin1">
              <select
                value={categoryVaccineID}
                onChange={onChangeCategory}
                className="info-vacxin1"
              >
                {
                    listData &&  listData.map((ele)=>(
                      <option value={ele.id}  key ={ele.id}>{ele.name}</option> )
                     )
                }
              </select>
            </form>
          </div>
          <div className="infomation-input1">
            <p>
              Tên vacxin <b className="important">(*):</b>
            </p>
            <input 
              type="text"
              name="name"
              value={name}
              onChange={onChangeName}
              className="ma-input1 info-vacxin1" />
              <p
                style={{ fontSize: "0.8rem", paddingTop: "5px", color:"red" }}
                >
                      {validationMsg.name}
                </p>
          </div>
        </div>

        <div className="form-input1">
          <div className="infomation-input1">
            <p>
              Ngày hết hạn <b className="important">(*):</b>
            </p>
            <form action="">
              <input
                type="date"
                value={exprirationDate}
                // value="2022-03-10T10:32" 
                onChange={onChangeDay}
                id="birthdaytime"
                name="birthdaytime"
                className="info-vacxin1"
              />
            </form>
          </div>

          <div className="infomation-input1">
            <p>
              Nhà sản xuất <b className="important">(*):</b>
            </p>
            <input 
              type="text" 
              name="producer"
              value={producer}
              className="ma-input1 info-vacxin1" 
              placeholder="Nhập nhà sản xuất "
              onChange={onChangeProducer}
              />
              <p
                style={{ fontSize: "0.8rem", paddingTop: "5px", color:"red" }}
                >
                      {validationMsg.producer}
                </p>
          </div>
          <div className="infomation-input">
            <p>Mô tả :</p>
            <textarea 
              type="text" 
              value={description}
              onChange={onChangeDescription}
              className="ma-input1 note-vacxin1" />
          </div>
        </div>

        {/* Button */}
        <div className="btn-vacxin1">
            <button type="reset" className="reset-btn1 btn-format1 "   onClick={onQuayLai}>
              <FaUndo />
              <i  className="text-btn1"  >Quay lại</i>
            </button>
            <button className="update-btn1 btn-format1" type="button" onClick={onSubmitUpdate}>
            <FaRegCheckCircle />
              <i className="text-btn1" >Cập nhật</i>
            </button>
          </div>
      </form>
    </div>
  );
}
export default Quanlyvacxin;