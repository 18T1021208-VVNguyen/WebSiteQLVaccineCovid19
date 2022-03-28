import React, { useState,useEffect  } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { Table } from "react-bootstrap";
// import { Link } from "react-router-dom";
import "../../Style/Admin/InjectionregistrationAdmin.css";
import InjectionregistrationService from "../../services/admin/InjectionregistrationService";


const Danhsachdangkytiem = (props) => {

  const [myhuyen, setMyHuyen] = useState("Quảng Điền");
  const [myxa, setMyXa] = useState("Quảng Phú");
  const [myngaytiem, setNgayTiem] = useState("10/03/2022");

  const [listRegistration,setListRegistration] = useState();
  const handleChange1 = (event) => {
    setMyHuyen(event.target.value);
  };
  const handleChange2 = (event) => {
    setMyXa(event.target.value);
  };
  const handleChange3 = (event) => {
    setNgayTiem(event.target.value);
  };

    
  const arrayPhanTrang = ()=>{
    let Array = [];
    if(listRegistration)
    {
          for(let i=1;i<=listRegistration.totalPages;i++){
                  Array.push(i);
          } 
    }
    return Array;
  }

  const handlePrevious = () =>{
    const currentPage = listRegistration.currentPage 
     if(currentPage===0 || listRegistration.totalPages===0){
         return;
     }
     getDataRegistration(currentPage-1);
   
   }

   const handleNext = () =>{
    const currentPage = listRegistration.currentPage 
    const totalPages = listRegistration.totalPages;
    if(currentPage >=totalPages-1 )
      return;
      getDataRegistration(currentPage+1);
  }
  const handleChoosePage = (_page) =>{  
    getDataRegistration(_page);
  }

  const getDataRegistration = (_page) =>{
    InjectionregistrationService.getRegistration(_page)
    .then((response) =>{
      setListRegistration(response.data);
      console.log(response.data);
    })
  }
  useEffect(()=>{
    // lấy dữ liệu        
    getDataRegistration(null)
           
    },[])
    const handleConfirm = (id) =>{
      console.log(id);
      
      InjectionregistrationService.confirmRegistration(id)
        .then(()=>{
          console.log(id);
          alert('Đã tiêm!');
          if(listRegistration.totalItems!==0)
          {
            if(listRegistration.currentPage ===0) { getDataRegistration(0); return};
  
            let totalPages = (listRegistration.totalItems-1)/5;
            if((listRegistration.totalItems-1)%5!==0)
              totalPages = totalPages +1;
  
            if(listRegistration.currentPage > totalPages-1)
              getDataRegistration(listRegistration.currentPage-1)
              else 
              getDataRegistration(listRegistration.currentPage);
          }
  
        })
    }
    const handleCancel = (id) =>{
      console.log(id);
      
        InjectionregistrationService.cancelRegistration(id)
        .then(()=>{
          alert('Huỷ tiêm!');
          if(listRegistration.totalItems!==0)
          {
            if(listRegistration.currentPage ===0) { getDataRegistration(0); return};
  
            let totalPages = (listRegistration.totalItems-1)/5;
            if((listRegistration.totalItems-1)%5!==0)
              totalPages = totalPages +1;
  
            if(listRegistration.currentPage > totalPages-1)
              getDataRegistration(listRegistration.currentPage-1)
              else 
              getDataRegistration(listRegistration.currentPage);
          }
  
        })
    }
  return (
    <div className="container1">
      <h2 className="header-name1"> Danh sách đăng ký tiêm</h2>
{/*       
      <div className="form-input-danh-sach1">
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
              <option value="Loại 1">10/03/2022 - 9h30</option>
              <option value="Loại 2">20/03/2022 - 9h30</option>
              <option value="Loại 3">01/04/2022 - 9h30</option>
              <option value="Loại 4">15/04/2022 - 9h30</option>
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
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {
            listRegistration && listRegistration.listnews.map((ele,index)=>(
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
              <td value={ele.status}>Đã đăng ký</td>
              <td>
                <button className="check-btn1" onClick={() =>{
                    handleConfirm(ele.id)
                    }} >
                  <FaRegCheckCircle />
                </button>
                <button className="huy-btn1" onClick={() =>{
                    handleCancel(ele.id)
                    }}>
                  X</button>
     
              </td>
            </tr>
            ))}
            
          </tbody>
        </Table>
      </div>
      <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
          
            <li className={ listRegistration&& (listRegistration.currentPage===0 ||listRegistration.totalPages===0)? "disabled page-item" :"page-item" } onClick={handlePrevious}>
              <a className="page-link" >Previous</a>
            </li>
              {
                arrayPhanTrang().map((ele)=>
                  <li className={listRegistration&& listRegistration.currentPage === ele-1 ?"page-item active" : "page-item"}
                  onClick={() =>{handleChoosePage(ele-1)}}><a className="page-link ">{ele}</a></li>
                )

              }
            <li className={ listRegistration && (listRegistration.currentPage>=listRegistration.totalPages-1 )? "disabled page-item" :"page-item" } onClick={handleNext}>
                <a className="page-link" >Next</a>
            </li>
            
          </ul>
        </nav>
    </div>
  );
}
export default Danhsachdangkytiem;