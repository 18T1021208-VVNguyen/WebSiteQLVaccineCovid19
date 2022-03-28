import "../../Style/Admin/CalendarAdmin.css"
import { FaUndo, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { Table } from "react-bootstrap";
import { useState,useEffect } from "react"
import InjectHistorySV from "../../services/user/InjectHistorySV.js"
import PublicService from "../../services/PublicService";


const InjectHistory = () =>{

    const [data,setData] = useState();

    const getDataAPI = ()=>{
        InjectHistorySV.getHistory()
        .then((response)=>{
                setData(response.data)
                console.log("Đây là lịch sử tiêm ")
                console.log(response.data);
        })  
    }
    const createDataAPI = (data) =>{
        const user = PublicService.getCurrentUser();
        if(user)
        {
                InjectHistorySV.createHistory(user.idCustomer,data)
                .then(()=>{
                            alert("Khai báo thành công");
                            getDataAPI();
                })
        }

    }
    const deleteDataAPI = (id) =>{
        InjectHistorySV.deleteHistory(id)
        .then(()=>{
            alert("Xóa Khai Báo Thành công");
            getDataAPI();
        })
    }

    const handleDelete = (id) =>{
        deleteDataAPI(id);
    }
    const handleRefetch= () =>{
         document.querySelector("#birthdaytime").value="";
         document.querySelector("#idAddress").value="";
         document.querySelector("#idVaccine").value="";
    }

    const handleCreate = () =>{
       
    //    console.log("Vào đây")
        const  numberInjection = document.querySelector("#idMuiTiem").value
        const dateEdit = document.querySelector("#birthdaytime").value
        if(dateEdit === "")
         {  alert("Ngày tiêm ko được để trống"); return;}
        const address = document.querySelector("#idAddress").value
        if(address===""){ alert("Địa chỉ không được để trống");  return;}
        const vaccineName = document.querySelector("#idVaccine").value
        if(vaccineName==="") { alert("Tên vaccine không được để trống"); return; }

        // Xử lý ngày giờ 
        let editDay = dateEdit.split("T");
        let day = editDay[0].split("-");
        day = day.reverse();
        day = day.join("-");
        let injectionDate = `${editDay[1]} ${day}`

        const data = {
            numberInjection,
            injectionDate,
            address,
            vaccineName
        }
        console.log(data);
        createDataAPI(data);
    }

    useEffect(()=>{
                    getDataAPI();
    },[])
    return (
        <div className="no_container" >
        
        <h2 className="no_header-name"> Khai Báo Lịch Sử Tiêm</h2>
        <div >
            <div className="no_form-input">
            <div className="no_infomation-input">
                <p>
                    Mũi Tiêm <b className="no_important">(*):</b>
                </p>
                <form className="no_category-vacxin">
                    <select id="idMuiTiem"  className="no_info-vacxin" >
                            <option value="1" >1</option> 
                            <option value="2" >2</option> 
                            <option value="3" >3</option> 
                            <option value="4" >4</option> 
                            <option value="5" >4</option>   
                            <option value="6" >6</option>  
                            <option value="7" >7</option> 
                            <option value="8" >8</option>           
                    </select>
                </form>
            </div>
            <div className="no_infomation-input">
                <p>
                    Ngày tiêm <b className="no_important">(*):</b>
                </p>
                 <form action="">
                    <input  type="datetime-local"  id="birthdaytime" name="birthdaytime" className="no_info-vacxin" />
                 </form>
            </div>
            
        </div>
    
        <div className="no_form-input">
            <div className="no_infomation-input">
                <p>
                Điạ điểm tiêm <b className="no_important">(*):</b>
                </p>
                <input id="idAddress" type="text" className="no_ma-input no_info-vacxin"  />
            </div>
            <div className="no_infomation-input">
             <p>Tên Vaccine <b className="no_important">(*):</b> </p>
                <input id="idVaccine" type="text" className="no_ma-input no_info-vacxin"  />
            </div>
            
            </div>
    
            {/* Button */}
            <div className="no_btn-vacxin">
            <button className="no_reset-btn no_btn-format" onClick={handleRefetch}>
                <FaUndo />
                <i className="no_text-btn">Nhập lại</i>
            </button>

            <button className="no_update-btn no_btn-format" onClick={()=>{handleCreate()}} >
                <FaPlusCircle />
                <i className="no_text-btn">Khai Báo </i>
            </button>
            </div>
        </div>
    
    
    
        <div className="no_table-vacxin">
            <Table id="customer">
            <thead>
                <tr>
                <th>STT</th>
                <th>Mũi tiêm</th>
                <th>Địa điểm tiêm</th>
                <th>Thời gian tiêm</th>
                <th>Tên vắc xin</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>

                
                {
                    data && data.map((ele,index)=>
                    (
                        <tr key={ele.id}>
                             <td>{index}</td>
                            <td>{ele.numberInjection}</td>
                            <td>{ele.address}</td>
                            <td> {ele.injectionDate}</td>
                            <td>{ele.vaccineName}</td>
                           
                            <td>
                            <div className="no_action">

                                <button className="no_delete-btn" onClick={()=>{handleDelete(ele.id)}}>
                                <FaTrashAlt />
                                
                                </button>
                            </div>
                            </td>
                        </tr>
                    )
                    )
                }
                
                
            
            </tbody>
            </Table>
        </div>
    
        
        </div>
    );
}
    export default InjectHistory;
  