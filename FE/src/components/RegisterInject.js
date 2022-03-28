import { FaSyringe } from "react-icons/fa";
import "../Style/Admin/CalendarAdmin.css";
import { Table } from "react-bootstrap";

import { useState,useEffect } from "react";
import RegisterInjectPublic from "../services/RegisterInject";
import PublicService from "../services/PublicService";
import { useHistory } from 'react-router-dom';

const RegisterInject = () =>{

    const [dataCalendar,setdataCalendar ] = useState();
    const history = useHistory();
    const buttonRegister = (ele) => {
          
          const user = PublicService.getCurrentUser();
          if(user)
          {
            const numinjec = document.querySelector("#numInject").value;
            const customerID = user.idCustomer;
  
            RegisterInjectPublic.InjectCalendar(customerID,ele,numinjec)
            .then((response)=>{
                  console.log(response.data);
                  // khi dang ki thanh cong
                  alert(" Đăng kí thành công");
                  history.push("/registerhistory");
            })
            .catch((error)=>{
                if(error.response)
                {
                      let messege = error.response.data;
                      // let substrings = messege.split(" ");
                      if(!messege.includes("unexpired"))
                      {
                              // Hiện thống báo mũi vừa tiêm chưa đủ 30 ngày .
                              alert("Khách hàng chưa đủ 30 ngày để tiêm mũi tiếp theo")
                      }
                      else{
                             history.push("/registerhistory"); 
                      }
                }
               
                
            })
          }
          else
          {
            history.push("/login");
          }
            
    }
    const getAPIData = (district,ward,page) =>{
      const user = PublicService.getCurrentUser();
      let customerid = null;
      if(user)
          customerid = user.idCustomer;

      RegisterInjectPublic.GetCalendarPublic(customerid,district,ward,page)
      .then((response)=>{
          setdataCalendar(response.data);
          console.log("Đây là data InjectCalendar : ");
          console.log(response.data);
      })
      .catch((error)=>{

          if(error.response){
             
               // Đã đăng ký 1 mũi tiêm và chưa hết hạn . 
              if(error.response.data==="fail"){
                history.push("/registerhistory");
              }
          }
      })
        
  }
  const arrayPhanTrang = ()=>{
    let Array = [];
    if(dataCalendar && dataCalendar.data)
    {
          for(let i=1;i<=dataCalendar.data.totalPages;i++){
                  Array.push(i);
          } 
    }
    return Array;
  }
    const handleHuyen  =(e)=>{
      const district = e.target.value;
      if(!dataCalendar ||  district==="") return ;
      console.log("huyen")
      console.log(district)
          getAPIData(district,null,null);
    }
    const handleXa = (e) =>{
      const ward = e.target.value;
      // if( !dataCalendar|| !dataCalendar.ward || ward ===  )
      if( !dataCalendar|| !dataCalendar.district  ) return;
      const district = dataCalendar.district
      if(  ward==='' || !ward) return ;
      getAPIData(district,ward,null);
    }
    const handleChoosePage = (page) =>{
      getAPIData(dataCalendar.district,dataCalendar.ward,page);
    }
    const handleNext = () =>{
      if(!dataCalendar || !dataCalendar.data || dataCalendar.data.currentPage>=dataCalendar.data.totalPages-1 ) return; 
          
      const currentPage =  dataCalendar.data.currentPage 
      const district = dataCalendar.district;
      const ward = dataCalendar.ward
      getAPIData(district,ward,currentPage+1);
    }
    const handlePrevious = () =>{
      if(!dataCalendar || !dataCalendar.data || dataCalendar.data.currentPage===0 ) return ;
      const currentPage =  dataCalendar.data.currentPage 
      const district = dataCalendar.district;
      const ward = dataCalendar.ward
      getAPIData(district,ward,currentPage-1);
    }
    const handleKhaiBao = () =>{
      console.log("hello");
      history.push("/Injecthistory");
    }
  useEffect(()=>{
          getAPIData(null,null,null);


  },[])
    return (
        <div className="no_container">
          <h2 className="no_header-name"> Đăng ký tiêm </h2>
          <div className="no_form-input">
            <div>
              <p style={{ color: "red" }}>
                Chú ý: Nếu bạn chưa khai báo lịch sử tiêm vui lòng cập nhật.
                <div onClick={handleKhaiBao} style={{display: "inline"}}> <u style={{ color: "blue" , cursor:"pointer" }} >Tại đây</u> </div>
              </p>
            </div>
            <div>
              {
                <> 
                    <p style={{ marginTop: "16px", marginBottom: "16px" }}>
                    Mũi tiêm gần nhất: 
                      <p style={{color:"blue" , display: "inline"}}>
                         {  dataCalendar &&  ( !dataCalendar.customerID ? ` Chưa đăng nhập` :
                         (  !dataCalendar.injectionHistory ? " Không có thông tin ": ` ${dataCalendar.injectionHistory.injectionDate}`) ) }
                        </p>
                    </p>
                </>
              }
             
            </div>
    
            <div className="no_infomation-input">
              <p>
                Mũi tiêm <b className="no_important">(*):</b>
              </p>
              <form className="no_category-vacxin">
                <select id="numInject"  className="no_info-vacxin">
                  { 
                     dataCalendar  &&  dataCalendar.injectionNum.map((ele)=>
                       <option value={ele}>{ele}</option>
                     )
                  }
                </select>
              </form>
            </div>
            <div className="no_infomation-input">
              <p>
                Huyện <b className="no_important">(*):</b>
              </p>
              <form className="no_category-vacxin">
                <select  className="no_info-vacxin" onChange={handleHuyen} >
                 
                  {
                    dataCalendar && dataCalendar.listDistrict && dataCalendar.listDistrict.map((ele)=> (
                      <option value={ele.districtName}>{ele.districtName}</option>
                    ))
                  }
                </select>
              </form>
            </div>
            <div className="no_infomation-input">
              <p>
                Xã <b className="no_important">(*):</b>
              </p>
              <form className="no_category-vacxin">
                <select  className="no_info-vacxin" onChange={handleXa}>
                
                  {
                    dataCalendar && dataCalendar.listWard && dataCalendar.listWard.map((ele)=>(
                      <option value={ele.wardName}>{ele.wardName}</option>
                    )     )     
                  }
                </select>
              </form>
            </div>
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
              }}
            >
              Danh sách lịch tiêm
            </div>
            <Table id="customer">
              <thead>
                <tr>
                  <th>Huyện</th>
                  <th>Xã</th>
                  <th>Địa điểm tiêm</th>
                  <th>Ngày bắt đầu tiêm</th>
                  <th>Tên Vacxin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                    dataCalendar&&  dataCalendar.data  && dataCalendar.data.injectionCalendars.map((ele)=>
                  <tr key={ele.id}>
                  <td>{ele.district}</td>
                  <td>{ele.ward}</td>
                  <td>{ele.injectionSite}</td>
                  <td>{ele.injectionDate}</td>
                  <td>{ele.vaccineName}</td>
                  <td>
                  
                      <button className="no_dang-ky-btn" onClick={ () => { buttonRegister(ele.id) } } >
                        <FaSyringe /> Đăng ký
                      </button>
                 
                  </td>
                </tr> 
                  )
                }
                
              </tbody>
            </Table>
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
            
              <li class={ !dataCalendar || !dataCalendar.data || dataCalendar.data.currentPage===0? "page-item disabled" :"page-item" }
               onClick={handlePrevious}>
                <a class="page-link" href="#" tabindex="-1">Previous</a>
              </li>
              {
                arrayPhanTrang().map((ele)=>
                     <li class={dataCalendar && dataCalendar.data && dataCalendar.data.currentPage ===ele-1?"page-item active" :"page-item"  }><a class="page-link" onClick={() =>{handleChoosePage(ele-1)}}>{ele}</a></li>
                )
              }
              <li  class={ !dataCalendar || !dataCalendar.data || dataCalendar.data.currentPage>=dataCalendar.data.totalPages-1? "page-item disabled" :"page-item" }
                  onClick={handleNext}>
                <a class="page-link" href="#">Next</a>
              </li>

            </ul>
          </nav>
        </div>
        
      );
}
export default RegisterInject;