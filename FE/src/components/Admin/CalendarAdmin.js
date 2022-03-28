import React, { useState,useEffect } from "react";

import "../../Style/Admin/CalendarAdmin.css"
import { FaUndo, FaPlusCircle, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import calendar from "../../services/admin/calendar";
const AdminCalendar = () =>{


const[listData , setListData] = useState({}); 
const [listCalendar,setListCalendar] = useState();

const arrayPhanTrang = ()=>{
  let Array = [];
  if(listCalendar)
  {
        for(let i=1;i<=listCalendar.totalPages;i++){
                Array.push(i);
        } 
  }
  return Array;
}

const handlePrevious = () =>{
 const currentPage = listCalendar.currentPage 
  if(currentPage===0 || listCalendar.totalPages==0){
      return;
  }
  getDataCalendar(currentPage-1);

}

const handleNext = () =>{
  const currentPage = listCalendar.currentPage 
  const totalPages = listCalendar.totalPages;
  if(currentPage >=totalPages-1 )
    return;
  getDataCalendar(currentPage+1);
}

const handleChoosePage = (page) =>{
  getDataCalendar(page);
}

const getData = (district,ward) =>{
    calendar.getDataFilter(district,ward)
    .then((resp)=>{ 
      setListData(resp.data);
    })
}

const getDataCalendar = (page) =>{
  calendar.getCalendar(page)
  .then((response) =>{
         setListCalendar(response.data);

  })
}


useEffect(()=>{
  // lấy dữ liệu        
         getData(null,null);
        getDataCalendar(null)
  },[])

  
  // console.log(listData);
  
  const handleHuyen = (e) =>{
    const huyen = e.target.value;
    calendar.getDataFilter(huyen,null)
      .then((resp)=>{
            setListData(resp.data);
      })
      .catch(()=>{

      })
  }
  const handleXa =(e)=>{
    const huyen = document.querySelector('#idHuyen').value
    // console.log(huyen);
    const xa = e.target.value;
    calendar.getDataFilter(huyen,xa)
      .then((resp)=>{
            setListData(resp.data);
      })
      .catch(()=>{

      })
  }
  const handleDelete = (id) =>{
    console.log(id);
    
      calendar.deleteCalendar(id)
      .then(()=>{
        if(listCalendar.totalItems!=0)
        {
          if(listCalendar.currentPage ===0) { getDataCalendar(0); return};

          let totalPages = (listCalendar.totalItems-1)/5;
          if((listCalendar.totalItems-1)%5!=0)
            totalPages = totalPages +1;

          if(listCalendar.currentPage > totalPages-1)
              getDataCalendar(listCalendar.currentPage-1)
            else 
            getDataCalendar(listCalendar.currentPage);
        }

      })
  }

  const handleReset = () =>{
    document.querySelector('#birthdaytime').value = "";
  }
// hàm thêm lịch tiêm
  const handelSubmit =()=>{
    // ngày tiêm
  const birthdaytime= document.querySelector('#birthdaytime').value;
  const idVaccine = document.querySelector("#idVaccine").value;
  const idAddress = listData.injectSite.id ;
    console.log(idAddress);

    if(!birthdaytime)
    {
        alert("Lịch tiêm không được để trong ");
        return ;
    }
    // Xử lý ngày giời
    let editDay = birthdaytime.split("T");
    let day = editDay[0].split("-");
    day = day.reverse();
    day = day.join("-");
    let resutDay = `${editDay[1]} ${day}`

 // xử lý xong --> Tạo 
    calendar.createCalendar(resutDay,idAddress,idVaccine)
    .then((res)=>{
        // console.log(res.data);
        alert("Thêm thành công");
        // Chuyển đến trang cuối
       const totalItem = listCalendar.totalPages * 5
       let page = listCalendar.totalPages;
       if(totalItem >= listCalendar.totalItems+1)
           page= page-1;
        getDataCalendar(page);
      
    })
    document.querySelector('#birthdaytime').value='';
   
  }
  console.log(listCalendar);
  console.log(arrayPhanTrang());
return (
  <div className="no_container" >
    
    <h2 className="no_header-name"> Quản lý lịch tiêm</h2>
    <div >
      <div className="no_form-input">
        <div className="no_infomation-input">
          <p>
            Ngày tiêm <b className="no_important">(*):</b>
          </p>
          <form action="">
            <input 
              type="datetime-local"
              id="birthdaytime"
              name="birthdaytime"
              className="no_info-vacxin"
            />
          </form>
        </div>
        <div className="no_infomation-input">
          <p>
            Huyện <b className="no_important">(*):</b>
          </p>
          <form className="no_category-vacxin">
            <select id="idHuyen"  className="no_info-vacxin" onChange={(e) =>{handleHuyen(e)}}>
              {
                  listData.listDistrict ?  listData.listDistrict.map((ele)=>
                    <option value={ele.districtName} key={ele.id}>{ele.districtName}</option>
                  ) :  ""
              }
            </select>
          </form>
        </div>
        <div className="no_infomation-input">
          <p>
            Xã <b className="no_important">(*):</b>
          </p>
          <form className="no_category-vacxin">
            <select id="idXa" className="no_info-vacxin" onChange={handleXa}>
              {
                  listData.listWard && listData.listWard.map((ele) => (
                    <option value={ele.wardName} key={ele.id}>{ele.wardName}</option> )
                  )
              }
            </select>
          </form>
        </div>
      </div>

      <div className="no_form-input">
        <div className="no_infomation-input">
          <p>
            Điạ điểm tiêm <b className="no_important">(*):</b>
          </p>
          <input id="idAddress" type="text" className="no_ma-input no_info-vacxin" value={listData.injectSite && listData.injectSite.name} />
        </div>
        <div className="no_infomation-input">
          <p>
            Tên vắc xin<b className="no_important">(*):</b>
          </p>
          <form className="no_category-vacxin">
            <select id="idVaccine" className="no_info-vacxin" >
                {
                    listData.listVaccine &&  listData.listVaccine.map((ele)=>(
                      <option value={ele.id}  key ={ele.id}>{ele.nameVaccine}</option> )
                     )
                }
            </select>
          </form>
        </div>
        
      </div>

      {/* Button */}
      <div className="no_btn-vacxin">
        <button className="no_reset-btn no_btn-format" onClick={handleReset}>
          <FaUndo />
          <i className="no_text-btn">Nhập lại</i>
        </button>
        <button className="no_update-btn no_btn-format"  onClick={handelSubmit}>
          <FaPlusCircle />
          <i className="no_text-btn">Tạo lịch</i>
        </button>
      </div>
     </div>



    <div className="no_table-vacxin">
      <Table id="customer">
        <thead>
          <tr>
            <th>STT</th>
            <th>Huyện</th>
            <th>Xã</th>
            <th>Địa điểm tiêm</th>
            <th>Thời gian tiêm</th>
            <th>Tên vắc xin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         
          {
             listCalendar && listCalendar.injectionCalendars.map((ele,index)=>(
              <tr key={index}>
              <td>{index}</td>
              <td>{ele.district}</td>
              <td>{ele.ward} </td>
              <td>{ele.injectionSite} </td>
              <td>{ele.injectionDate}</td>
              <td>{ele.vaccineName}</td>
              <td>
                <div className="no_action">
                  {/* <Link to="/quan-ly-lich-tiem-edit">
                    <button className="no_edit-btn">
                      <FaRegEdit />
                    </button>
                  </Link> */}
                  <button className="no_delete-btn" onClick={() =>{
                    handleDelete(ele.id)
                  }} >
                    <FaTrashAlt />
                   
                  </button>
                </div>
              </td>
            </tr>
             ))
          }
         
        </tbody>
      </Table>
    </div>

    <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
   
    <li className={ listCalendar&& (listCalendar.currentPage===0 ||listCalendar.totalPages==0)? "disabled page-item" :"page-item" } onClick={handlePrevious}>
      <a className="page-link" >Previous</a>
    </li>
      {
        arrayPhanTrang().map((ele)=>
          <li className={listCalendar&& listCalendar.currentPage === ele-1 ?"page-item active" : "page-item"}
           onClick={() =>{handleChoosePage(ele-1)}}><a className="page-link ">{ele}</a></li>
        )

      }
    <li className={ listCalendar && (listCalendar.currentPage>=listCalendar.totalPages-1 )? "disabled page-item" :"page-item" } onClick={handleNext}>
         <a className="page-link" >Next</a>
    </li>
    
  </ul>
</nav>
  </div>
);

}


export default AdminCalendar;