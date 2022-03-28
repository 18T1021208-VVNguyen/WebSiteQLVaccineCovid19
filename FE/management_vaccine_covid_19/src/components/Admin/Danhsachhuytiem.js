import React, { useState,useEffect } from "react";
import { Table } from "react-bootstrap";
import InjectionregistrationService from "../../services/admin/InjectionregistrationService";
import "../../Style/Admin/InjectionregistrationAdmin.css"

const Danhsachhuytiem = (props) => {
  const [myhuyen, setMyHuyen] = useState("Quảng Điền");
  const [myxa, setMyXa] = useState("Quảng Phú");
  const [myngaytiem, setNgayTiem] = useState("10/03/2022");

  
  const [listCancel,setListCancel] = useState();

  const arrayPhanTrang = ()=>{
    let Array = [];
    if(listCancel)
    {
          for(let i=1;i<=listCancel.totalPages;i++){
                  Array.push(i);
          } 
    }
    return Array;
  }
  const handlePrevious = () =>{
    const currentPage = listCancel.currentPage 
     if(currentPage===0 || listCancel.totalPages===0){
         return;
     }
     getDataCancel(currentPage-1);
   
   }
   const handleNext = () =>{
    const currentPage = listCancel.currentPage 
    const totalPages = listCancel.totalPages;
    if(currentPage >=totalPages-1 )
      return;
      getDataCancel(currentPage+1);
  }
  const handleChoosePage = (_page) =>{  
    getDataCancel(_page);
  }

  const getDataCancel = (_page) =>{
    InjectionregistrationService.getCancel(_page)
    .then((response) =>{
      setListCancel(response.data);
      console.log(response.data);
    })
  }

  useEffect(()=>{
    // lấy dữ liệu        
    getDataCancel(null)
           
  },[])

  const handleChange1 = (event) => {
    setMyHuyen(event.target.value);
  };
  const handleChange2 = (event) => {
    setMyXa(event.target.value);
  };
  const handleChange3 = (event) => {
    setNgayTiem(event.target.value);
  };
  return (
    <div className="container1">
      <h2 className="header-name"> Danh sách huỷ tiêm </h2>

      {/* <div className="form-input-danh-sach1">
        <div className="danh-sach-input1">
          <p>Huyện</p>
          <form className="category-vacxin1">
            <select
              value={myhuyen}
              onChange={handleChange1}
              className="info-danh-sach1"
            >
              <option value="Loại 1">Quảng Điền</option>
              <option value="Loại 2">Phong Điền</option>
              <option value="Loại 3">TT Sịa</option>
              <option value="Loại 4">Phú Lộc</option>
            </select>
          </form>
        </div>
        <div className="danh-sach-input1">
          <p>Xã</p>
          <form className="category-vacxin1">
            <select
              value={myxa}
              onChange={handleChange2}
              className="info-danh-sach1"
            >
              <option value="Loại 1">Quảng Phú</option>
              <option value="Loại 2">Quảng Vinh</option>
              <option value="Loại 3">An Lỗ</option>
              <option value="Loại 4">Phú Lễ</option>
            </select>
          </form>
        </div>
        <div className="danh-sach-input1">
          <p>Ngày tiêm</p>
          <form className="category-vacxin1">
            <select
              value={myngaytiem}
              onChange={handleChange3}
              className="info-danh-sach1"
            >
              <option value="Loại 1">10/03/2022</option>
              <option value="Loại 2">20/03/2022</option>
              <option value="Loại 3">01/04/2022</option>
              <option value="Loại 4">15/04/2022</option>
            </select>
          </form>
        </div>
      </div> */}

      <div>
        <p className="name-list1">Danh sách</p>
      </div>

      {/* Button */}
      {/* <div className="btn-vacxin">
        <div className="reset-btn btn-format">
          <FaUndo />
          <i className="text-btn">Nhập lại</i>
        </div>
        <div className="update-btn btn-format">
          <FaPlusCircle />
          <i className="text-btn">Cập nhật</i>
        </div>
      </div> */}
      <div className="table-vacxin1">
        <Table id="customer1">
          <thead>
            <tr>
            <th>STT</th>
              <th>Họ và tên</th>
              <th>CMND/CCCD</th>
              <th>Số điện thoại</th>
              <th>Mũi tiêm</th>
              <th>Huyện</th>
              <th>Xã</th>
              <th>Địa điểm tiêm</th>
              <th>Ngày tiêm</th>
              <th>Tên vacxin</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
          {
            listCancel && listCancel.listnews.map((ele,index)=>(
              <tr key = {index}>
                <td>{index +1}</td>
                <td>{ele.customerName}</td>
                <td>{ele.customerIdentification}</td>
                <td>{ele.customerPhoneNumber}</td>
                <td>{ele.numberInjection}</td>
                <td>{ele.injectionCalendarAddressDistrict}</td>
                <td>{ele.injectionCalendarAddressWard}</td>
                <td>{ele.injectionCalendarAddress}</td>
                <td>{ele.injectionCalendarInjectionDate}</td>
                <td>{ele.injectionCalendarVaccineName}</td>
                <td value={ele.status}>Huỷ tiêm</td>
             
              </tr>
            ))}
            
          </tbody>
        </Table>
      </div>
      <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
          
            <li className={ listCancel&& (listCancel.currentPage===0 ||listCancel.totalPages===0)? "disabled page-item" :"page-item" } onClick={handlePrevious}>
              <a className="page-link" >Previous</a>
            </li>
              {
                arrayPhanTrang().map((ele)=>
                  <li className={listCancel&& listCancel.currentPage === ele-1 ?"page-item active" : "page-item"}
                  onClick={() =>{handleChoosePage(ele-1)}}><a className="page-link ">{ele}</a></li>
                )

              }
            <li className={ listCancel && (listCancel.currentPage>=listCancel.totalPages-1 )? "disabled page-item" :"page-item" } onClick={handleNext}>
                <a className="page-link" >Next</a>
            </li>
            
          </ul>
        </nav>
    </div>
  );
}
export default Danhsachhuytiem;