import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  FaRegListAlt } from "react-icons/fa";
import PublicService from "../../services/PublicService";
function Profile() {
  const [username, setUserName] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [identification, setIdentification] = useState("");
  const [healthInsuranceNumber, setHealthInsuranceNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ethnic, setEthnic] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    PublicService.profile()
      .then((response) => {
        if (response.data) {
          setUserName(response.data.username);
          setCode(response.data.customerDTO.code);
          setName(response.data.customerDTO.name);
          setBirthday(response.data.customerDTO.birthday);
          setGender(response.data.customerDTO.gender);
          setPhoneNumber(response.data.customerDTO.phoneNumber);
          setEmail(response.data.customerDTO.email);
          setIdentification(response.data.customerDTO.identification);
          setHealthInsuranceNumber(
            response.data.customerDTO.healthInsuranceNumber
          );
          setOccupation(response.data.customerDTO.occupation);
          setEthnic(response.data.customerDTO.ethnic);
          setAddress(response.data.customerDTO.address);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <>
      <h5 className="well font-weight-bold text-primary">
        HỒ SƠ CÁ NHÂN {" "}
        <Link to={"/update-profile"}>
        
         <FaRegListAlt className="no_icon-header" />
        </Link>
      </h5>
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                      class="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{username}</h4>
                      <p class="text-secondary mb-1">ID: {code}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Họ và tên</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{name}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Ngày sinh</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{birthday}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Giới tính</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{gender===1?"Nam":"Nữ"}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{phoneNumber}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">CCCD</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {identification}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">BHYT</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {healthInsuranceNumber}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Nghề nghiệp</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{occupation}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Dân tộc</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{ethnic}</div>
                  </div>
                  <hr />
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Địa chỉ</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{address}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;