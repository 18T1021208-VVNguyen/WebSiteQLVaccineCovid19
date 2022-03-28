import React from "react";
import { FaTrash } from "react-icons/fa";
import "../../Style/Admin/CalendarAdmin.css";
import { Table } from "react-bootstrap";
import { useState,useEffect } from "react";
import getRegisterHistory from "../../services/user/RegisterHistoryService";
import PublicService from "../../services/PublicService";
import { useHistory } from 'react-router-dom';

const RegisterHistory = () =>  {

  const [dataHistory ,setdataCalendar] = useState();
  const history = useHistory();
  const handleRemoveRegister = (registerId) =>{
    getRegisterHistory.removeRegister(registerId)
    .then((response)=>{
      console.log(response.data)
      if(response.data==="success")
          history.push('/RegisterInject')
    })
    .catch((error)=>{
        console.log(error.response.data)
        alert(" Đã xác nhận đăng kí Không thể hủy tiêm")
    })
    
  }
  const getAPIData =  () =>{
      const user = PublicService.getCurrentUser();
          if(user)
          {
              getRegisterHistory.getRegisterHistory(user.idCustomer)
              .then((response)=>{
                  setdataCalendar(response.data)
                  console.log(response.data);
              })
          }
  }
  useEffect(()=>{
    // lấy dữ liệu 
      getAPIData();
  },[])

  return (
    <div className="no_container">
      <div className="no_table-vacxin">
        <div
          style={{
            padding: "8px",
            width: "200px",
            border: "1px solid #ccc",
            backgroundColor: "#4d4d4d",
            color: "white",
            textAlign: "center",
          }}
        >
          Mũi vừa đăng ký 
        </div>
        <Table id="customer">
          <thead>
            <tr>
              <th>Mũi tiêm</th>
              <th>Địa điểm tiêm</th>
              <th>Ngày tiêm</th>
              <th>Tên Vacxin</th>
              <th>Trạng thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
            {
              dataHistory && dataHistory.listRegistrationUnexpired &&  dataHistory.listRegistrationUnexpired.map((ele)=>(
                <tr key={ele.id}>
                  <td>{ele.numberInjection}</td>
                  <td>{ele.injectionSite}</td>
                  <td>{ele.injectionDate}</td>
                  <td>{ele.vaccineName}</td>
                  <td>{ele.status===0 ? "Đã đăng ký": ( ele.status===1  ? "Đã tiêm" :"Hủy Tiêm" )}</td>
                  <td>
                    
                      <button className="no_huy-dang-ky-btn" onClick={()=>{ handleRemoveRegister(ele.id)}}>
                        <FaTrash /> Hủy đăng ký
                      </button>
                   
                  </td>
              </tr>
              ))
            }
           
          </tbody>
        </Table>
      </div>
      <div className="no_table-vacxin">
        <div
          style={{
            padding: "8px",
            width: "200px",
            border: "1px solid #ccc",
            backgroundColor: "#4d4d4d",
            color: "white",
            textAlign: "center",
            marginTop: "32px",
          }}
        >
          Lịch sử đăng ký
        </div>
        <Table id="customer">
          <thead>
            <tr>
              <th>Mũi tiêm</th>
              <th>Địa điểm tiêm</th>
              <th>Ngày tiêm</th>
              <th>Tên Vacxin</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
           
            {
              dataHistory && dataHistory.listRegistrationExpired && dataHistory.listRegistrationExpired.map((ele)=>(
                <tr key={ele.id}>
                  <td>{ele.numberInjection}</td>
                  <td>{ele.injectionSite}</td>
                  <td>{ele.injectionDate}</td>
                  <td>{ele.vaccineName}</td>
                  <td>{ele.status===0 ? "Đã đăng ký": ( ele.status===1  ? "Đã tiêm" :"Hủy Tiêm" )}</td>
                 
                </tr>
              ))
            }
           
          </tbody>
        </Table>
      </div>
    </div>
  );
}
export default RegisterHistory