import React, { useState,useEffect } from "react";
import { FaUndo, FaPlusCircle, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import "../../Style/Admin/Vaccine.css"
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import VaccineService from "../../services/admin/VaccineService";
import { useHistory} from "react-router-dom";


const QuanlyvacxinIndex = (props) => {  
  const [listVaccine,setListVaccine] = useState();
  const [listData,setListData] = useState();
  const [code, setCode] = useState("");
  const [categoryVaccineID, setCategoryVaccineID] = useState();
  const [name, setName] = useState("");
  const [exprirationDate, setExprirationDate] = useState("");
  const [producer, setProducer] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [successful, setSuccessful] = useState(false)
  const [validationMsg, setValidationMsg] = useState({});


  const arrayPhanTrang = ()=>{
    let Array = [];
    if(listVaccine)
    {
          for(let i=1;i<=listVaccine.totalPages;i++){
                  Array.push(i);
          } 
    }
    return Array;
  }
  const handlePrevious = () =>{
    const currentPage = listVaccine.currentPage 
     if(currentPage===0 || listVaccine.totalPages===0){
         return;
     }
     getDataVaccine(currentPage-1);
   
   }
   const handleNext = () =>{
    const currentPage = listVaccine.currentPage 
    const totalPages = listVaccine.totalPages;
    if(currentPage >=totalPages-1 )
      return;
      getDataVaccine(currentPage+1);
  }
  const handleChoosePage = (_page) =>{  
    getDataVaccine(_page);
  }
  const getDataVaccine = (_page) =>{
    VaccineService.getVaccine(_page)
    .then((response) =>{
      setListVaccine(response.data);
      console.log(response.data);
    })
  }
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
      getDataVaccine(null)
           
  },[])

  const handleDelete = (id) =>{
    console.log(id);
    
      VaccineService.deleteVaccine(id)
      .then(()=>{
        alert('Xoá thành công!');
        if(listVaccine.totalItems!==0)
        {
          if(listVaccine.currentPage ===0) { getDataVaccine(0); return};

          let totalPages = (listVaccine.totalItems-1)/5;
          if((listVaccine.totalItems-1)%5!==0)
            totalPages = totalPages +1;

          if(listVaccine.currentPage > totalPages-1)
            getDataVaccine(listVaccine.currentPage-1)
            else 
            getDataVaccine(listVaccine.currentPage);
        }

      })
  }

  const onChangeCode = (e) => {
    const value = e.target.value;
    setCode(value);
  };
  
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
    if (isEmpty(code)) {
      msg.code = "Mã  vaccine không được để trống";
    }
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

  const onSubmitReset = () => {
    setCode("")
    setName("")
    setExprirationDate("")
    setProducer("")
    setDescription("")

  }
  const onSubmitCreate = () => {

    setMessage("");
    const isValid = validAll();
    if (!isValid) {
      return;
    } else {
       
            const  caVaccineId = document.querySelector("#idCategoryVaccine").value
            console.log("loai vacccine")
            console.log(caVaccineId)
            if(!caVaccineId || caVaccineId==="") return;
                setCategoryVaccineID(caVaccineId)
        
      const vaccine = {
        code,
        "categoryVaccineID" : caVaccineId,
        name,
        exprirationDate,
        producer,
        description
      };
      console.log(vaccine);
      VaccineService.createVaccine(vaccine).then(
       
        (response) => {
          
          setMessage(response.data.message);
          setSuccessful(true)
          console.log(message);
          alert('Thêm thành công!');
          history.push("/quan-ly-vacxin-index");
          const totalItem = listVaccine.totalPages * 5
          let page = listVaccine.totalPages;
          if(totalItem >= listVaccine.totalItems+1)
          page= page-1;
          getDataVaccine(page);
          // window.location.reload();
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
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    }
  };

  

  return (
    <>
    <div className="container1">
      <h2 className="header-name1"> Quản lý vacxin </h2>
      {message && (
              <div className="form-group1">
                <p  className={ successful ? "alert alert-success" : "alert alert-danger" }>{message}</p>
              </div>
            )}
      <form method="post">
        <div className="form-input1">
          <div className="infomation-input1">
            <p>
              Mã vacxin <b className="important">(*):</b>
            </p>
            <input
              name="code"
              type="text"
              className="ma-input1 info-vacxin1"
              placeholder="Nhập mã vaccine"
              onChange={onChangeCode}
            />
            <p
                style={{ fontSize: "0.8rem", paddingTop: "5px", color:"red" }}
                >
                      {validationMsg.code}
                </p>
          </div>
          <div className="infomation-input1">
            <p>
              Loại vacxin <b className="important">(*):</b>
            </p>
            <form className="category-vacxin1">
              <select id="idCategoryVaccine"
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
              name="name"
              type="text" 
              className="ma-input1 info-vacxin1" 
              placeholder="Nhập tên vaccine"
              onChange={onChangeName}/>
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
                id="birthdaytime"
                name="birthdaytime"
                className="info-vacxin1"
                onChange={onChangeDay}
              />
               <p
                style={{ fontSize: "0.8rem", paddingTop: "5px", color:"red" }}
                >
                      {validationMsg.day}
                </p>
            </form>
          </div>

          <div className="infomation-input1">
            <p>
              Nhà sản xuất <b className="important">(*):</b>
            </p>
            <input 
              type="text" 
              name="producer"
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
          <div className="infomation-input1">
            <p>Mô tả :</p>
            <textarea 
              type="text" 
              placeholder="Mô tả"
              onChange={onChangeDescription}
              className="ma-input1 note-vacxin1" />
          </div>
        </div>
      

         {/* Button */}
         <div className="btn-vacxin1">
            <button type="reset" className="reset-btn1 btn-format1 "   onClick={onSubmitReset}>
              <FaUndo />
              <i  className="text-btn1"  >Nhập lại</i>
            </button>
            <button className="update-btn1 btn-format1" type="button">
              <FaPlusCircle />
              <i className="text-btn1" onClick={onSubmitCreate}>Thêm mới</i>
            </button>
          </div>
      </form>
    
      <div className="table-vacxin1">
        <Table id="customer1">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã Vacxin</th>
              <th>Loại Vacxin</th>
              <th>Tên Vacxin</th>
              <th>Ngày hết hạn</th>
              <th>Nhà sản xuất</th>
              <th>Mô tả</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {
              listVaccine && listVaccine.listVaccine.map((ele,index)=>(
            <tr key ={index}>
              <td>{index+1}</td>
              <td>{ele.code}</td>
              <td value={ele.categoryVaccineID}>{ele.categoryVaccineName}</td>
              <td>{ele.name}</td>
              <td>{ele.exprirationDate}</td>
              <td>{ele.producer}</td>
              <td className="description1">{ele.description}</td>
              <td>
                <div className="action1">
                  <Link to={`/admin/vaccine/${ele.id}`}>
                    <button className="edit-btn1">
                      <FaRegEdit />
                    </button>
                  </Link>
                  <button className="delete-btn1"onClick={() =>{
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
    </div>
    <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
          
            <li className={ listVaccine&& (listVaccine.currentPage===0 ||listVaccine.totalPages===0)? "disabled page-item" :"page-item" } onClick={handlePrevious}>
              <a className="page-link" >Previous</a>
            </li>
              {
                arrayPhanTrang().map((ele)=>
                  <li className={listVaccine&& listVaccine.currentPage === ele-1 ?"page-item active" : "page-item"}
                  onClick={() =>{handleChoosePage(ele-1)}}><a className="page-link ">{ele}</a></li>
                )

              }
            <li className={ listVaccine && (listVaccine.currentPage>=listVaccine.totalPages-1 )? "disabled page-item" :"page-item" } onClick={handleNext}>
                <a className="page-link" >Next</a>
            </li>
            
          </ul>
        </nav>
    </>
  );
};
export default QuanlyvacxinIndex;