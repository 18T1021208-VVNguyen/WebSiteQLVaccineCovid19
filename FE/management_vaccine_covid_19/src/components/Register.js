import React from "react";
import { useState } from "react";

import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import "../Style/Register.css"
import userService from "../services/PublicService.js";
import { useHistory } from "react-router-dom";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [identification, setIdentification] = useState("");
  const [healthInsuranceNumber, setHealthInsuranceNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ethnic, setEthnic] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false)

  const history = useHistory();

  const [validationMsg, setValidationMsg] = useState({});

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };
  const onChangeFullname = (e) => {
    const value = e.target.value;
    setName(value);
  };
  const onChangeBirthday = (e) => {
    const value = e.target.value;
    setBirthday(value);
  };
  const onChangeGender = (e) => {
    const value = e.target.value;
    setGender(value);
  };
  const onChangePhoneNumber = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };
  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const onChangeIdentification = (e) => {
    const value = e.target.value;
    setIdentification(value);
  };
  const onChangeHealthInsuranceNumber = (e) => {
    const value = e.target.value;
    setHealthInsuranceNumber(value);
  };
  const onChangeOccupation = (e) => {
    const value = e.target.value;
    setOccupation(value);
  };
  const onChangeEthnic = (e) => {
    const value = e.target.value;
    setEthnic(value);
  };
  const onChangeAddress = (e) => {
    const value = e.target.value;
    setAddress(value);
  };

  const validAll = () => {
    const msg = {};
    if (isEmpty(username)) {
      msg.username = "Tên đăng nhập không được để trống";
    }
    if (isEmpty(password)) {
      msg.password = "Mật khẩu không được để trống";
    }
    if (isEmpty(name)) {
      msg.name = "Họ tên không được để trống";
    }
    if (isEmpty(birthday)) {
      msg.birthday = "Ngày sinh không được để trống";
    }
    if (!isEmail(email)) {
      msg.email = "Email không hợp lệ";
    }
    if (isEmpty(identification)) {
      msg.identification = "CCCD không được để trống";
    }
    // else if (identification.length < 12 || identification.length > 12) {
    //   msg.identification = "CCCD không hợp lệ";
    // }

    if (isEmpty(healthInsuranceNumber)) {
      msg.healthInsuranceNumber = "Số thẻ BHYT không được để trống";
    }
    //else if (
    //   healthInsuranceNumber.length < 10 ||
    //   healthInsuranceNumber.length > 10
    // ) {
    //   msg.healthInsuranceNumber = "Số thẻ BHYT không hợp lệ";
    // }
    if(isEmpty(occupation)){
      msg.occupation="Nghề nghiệp không được để trống"
    }
    if(isEmpty(address)){
      msg.address="Địa chỉ không được để trống"
    }
    if(isEmpty(phoneNumber)){
      msg.phoneNumber="Số điện thoại không được để trống"
    }
    if(isEmpty(ethnic)){
      msg.ethnic="Dân tộc không được để trống"
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const onSubmitRegister = () => {
    setMessage("");
    const isValid = validAll();
    if (!isValid) {
      return;
    } else {
      const user = {
        username,
        password,
        name,
        birthday,
        gender,
        phoneNumber,
        email,
        identification,
        healthInsuranceNumber,
        occupation,
        ethnic,
        address,
      };

      userService
        .registerUser(user)
        .then((response) => {
          setMessage(response.data.message);
          setSuccessful(true)
          console.log(message);
          history.push("/login");
          window.location.reload();
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            setMessage(error.response.data);
            setSuccessful(false)
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

  return (


    <>
    <h5 className="well font-weight-bold text-primary">
        ĐĂNG KÍ TÀI KHOẢN
      </h5>
      {message && (
              <div className="form-group">
                <p  className={ successful ? "alert alert-success" : "alert alert-danger" }>{message}</p>
              </div>
            )}

      <div className="container rounded bg-white ">
        <div className="row">
       
          <div className="col-md-2 "></div>

          <div className="col-md-8 ">
            <div >
            <div className="row mt-2">
                <div className="col-md-6">
                  <label className="label">Tên đăng nhập <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                   placeholder="Tên đăng nhập"
                    value={username}
                    onChange={onChangeUsername}
                  
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.username}
                    </p>
                  
                </div>
                <div className="col-md-6">
                  <label className="label">Mật khẩu <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={onChangePassword}
                    
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.password}
                    </p>
                  
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="label">Họ tên <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ tên"
                    value={name}
                    onChange={onChangeFullname}
                   
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.name}
                    </p>
                  
                </div>
              </div>
              <div className="row mt-3">
                <br/>
                <div className="col-md-12">
                <label className="label">CCCD <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CCCD"
                    value={identification}
                    onChange={onChangeIdentification}
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.identification}
                    </p>
                </div>
                <br/>
                </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="label">Ngày sinh <span className="text-danger">(*)</span></label>
                  <input
                    type="date"
                    className="form-control"
                   
                    value={birthday}
                    onChange={onChangeBirthday}
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.birthday}
                    </p>
                  
                </div>
                <div className="col-md-6">
                  <label className="label">Giới tính <span className="text-danger">(*)</span></label>
                  <select
                      class="form-control "
                      onChange={onChangeGender}
                      value={gender}
                    >
                      <option value="1">Nam</option>
                      <option value="0">Nữ</option>
                    </select>
                </div>
              </div>
              
              <div className="row mt-3">
                <br/>
                <div className="col-md-12">
                  <label className="label">Email <span className="text-danger">(*)</span></label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={onChangeEmail}
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.email}
                    </p>
                </div>
                <br/>
                <div className="col-md-12">
                  <label className="label">Số điện thoại <span className="text-danger">(*)</span></label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="số điện thoại"
                    value={phoneNumber}
                    onChange={onChangePhoneNumber}
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.phoneNumber}
                    </p>
                </div>
                <br/>
                <div className="col-md-12">
                  <label className="label">Số BHYT <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="BHYT"
                    value={healthInsuranceNumber}
                    onChange={onChangeHealthInsuranceNumber}
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.healthInsuranceNumber}
                    </p>
                </div>
               
              </div>
             
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="label">Nghề nghiệp <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nghề nghiệp"
                    value={occupation}
                    onChange={onChangeOccupation}
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.occupation}
                    </p>
                </div>
                <div className="col-md-6">
                  <label className="label">Dân tộc <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={ethnic}
                    placeHolder="Dân tộc"
                    onChange={onChangeEthnic}
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.ethnic}
                    </p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="label">Địa chỉ hiện tại <span className="text-danger">(*)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Địa chỉ"
                    value={address}
                    onChange={onChangeAddress}
                    
                  />
                   <p
                      className="text-danger font-italic"
                      style={{ fontSize: "0.8rem", paddingTop: "5px" }}
                    >
                      {validationMsg.address}
                    </p>
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  onClick={onSubmitRegister}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>















    
  );
};

export default Register;