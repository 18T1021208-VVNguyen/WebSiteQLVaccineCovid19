import React from "react";
import { FaUndo, FaRegEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import "../../Style/Admin/CategoryAdmin.css"
import { Table } from "react-bootstrap";
import { Link} from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import { useState,useEffect } from "react";
import CategoryService from "../../services/admin/CategoryService";
import { useHistory} from "react-router-dom";




const QuanlyloaivacxinIndex= (props) => {
  
  const [listCategory,setListCategory] = useState();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false)


  const history = useHistory();

  const [validationMsg, setValidationMsg] = useState({});
  
  const arrayPhanTrang = ()=>{
    let Array = [];
    if(listCategory)
    {
          for(let i=1;i<=listCategory.totalPages;i++){
                  Array.push(i);
          } 
    }
    return Array;
  }

  const handlePrevious = () =>{
    const currentPage = listCategory.currentPage 
     if(currentPage===0 || listCategory.totalPages===0){
         return;
     }
     getDataCategory(currentPage-1);
   
   }
   const handleNext = () =>{
    const currentPage = listCategory.currentPage 
    const totalPages = listCategory.totalPages;
    if(currentPage >=totalPages-1 )
      return;
      getDataCategory(currentPage+1);
  }
  const handleChoosePage = (_page) =>{  
    getDataCategory(_page);
  }
  
  const onChangeCode = (e) => {
    const value = e.target.value;
    setCode(value);
  };

  const onChangeName = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const getDataCategory = (_page) =>{
    CategoryService.getCategory(_page)
    .then((response) =>{
      setListCategory(response.data);
      console.log(response.data);
    })
  }
  
  
  useEffect(()=>{
    // lấy dữ liệu        
           getDataCategory(null)
           
    },[])

  const validAll = () => {
    const msg = {};
    if (isEmpty(code)) {
      msg.code = "Mã loại vaccine không được để trống";
    }
    if (isEmpty(name)) {
      msg.name = "Tên loại vaccine không được để trống";
    }
    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  

  const handleDelete = (id) =>{
    console.log(id);
    
      CategoryService.deleteCalendar(id)
      .then(()=>{
        alert('Xoá thành công!');
        if(listCategory.totalItems!==0)
        {
          if(listCategory.currentPage ===0) { getDataCategory(0); return};

          let totalPages = (listCategory.totalItems-1)/5;
          if((listCategory.totalItems-1)%5!==0)
            totalPages = totalPages +1;

          if(listCategory.currentPage > totalPages-1)
            getDataCategory(listCategory.currentPage-1)
            else 
            getDataCategory(listCategory.currentPage);
        }

      })
  }

  const onSubmitReset = () => {
    setCode("")
    setName("")
  }
  const onSubmitCreate = () => {

    setMessage("");
    const isValid = validAll();
    if (!isValid) {
      return;
    } else {
      const category = {
        code,
        name
      };

      CategoryService.createCategory(category).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true)
          console.log(message);
          alert('Thêm thành công!');
          history.push("/quan-ly-loai-vacxin-index");
          const totalItem = listCategory.totalPages * 5
          let page = listCategory.totalPages;
          if(totalItem >= listCategory.totalItems+1)
          page= page-1;
          getDataCategory(page);
      
    
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
        <h2 className="header-name1"> Quản lý loại vacxin </h2>
        {message && (
              <div className="form-group1">
                <p  className={ successful ? "alert alert-success" : "alert alert-danger" }>{message}</p>
              </div>
            )}
        <form method="post">
          <div className="form-input-vacxin1">
            <div className="vacxin-input1">
              <p>
                Mã loại vacxin <b className="key-important">(*):</b>
              </p>
              <input
                name="code"
                type="text"
                className="ma-input1 info-loai-vacxin1 "
                placeholder="Nhập mã loại"
                onChange={onChangeCode}
               
              />
              <p
                style={{ fontSize: "0.8rem", paddingTop: "5px",color:"red" }}
              >
                      {validationMsg.code}
              </p>
            </div>

            <div className="vacxin-input1">
              <p>
                Tên loại vacxin <b className="key-important">(*):</b>
              </p>
              <input 
                name="name"
                type="text"             
                className="ma-input1 info-loai-vacxin1 "
                placeholder="Nhập tên loại"
                onChange={onChangeName}
                />
                <p
                style={{ fontSize: "0.8rem", paddingTop: "5px", color:"red" }}
                >
                      {validationMsg.name}
                </p>
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

        {/* table */}

        <div className="table-vacxin1">
          <Table id="customer1">
            <thead>
              <tr>
                <th>STT</th>
                <th>Loại Vacxin</th>
                <th>Tên loại Vacxin</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {listCategory && listCategory.listCategoryVaccine.map((ele,index)=>(
              <tr key = {index}>
                <td>{index +1}</td>
                <td>{ele.code}</td>
                <td>{ele.name}</td>
                <td>
                  <div className="action1">
                    <Link  to={`/admin/categoryvaccine/${ele.id}`}>
                      <button className="edit-btn-loai1" >
                        <FaRegEdit />
                      </button>
                    </Link>
                    <button className="delete-btn-loai1"onClick={() =>{
                    handleDelete(ele.id)
                    }} >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
              ))}           
            </tbody>
          </Table>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
          
            <li className={ listCategory&& (listCategory.currentPage===0 ||listCategory.totalPages===0)? "disabled page-item" :"page-item" } onClick={handlePrevious}>
              <a className="page-link" >Previous</a>
            </li>
              {
                arrayPhanTrang().map((ele)=>
                  <li className={listCategory&& listCategory.currentPage === ele-1 ?"page-item active" : "page-item"}
                  onClick={() =>{handleChoosePage(ele-1)}}><a className="page-link ">{ele}</a></li>
                )

              }
            <li className={ listCategory && (listCategory.currentPage>=listCategory.totalPages-1 )? "disabled page-item" :"page-item" } onClick={handleNext}>
                <a className="page-link" >Next</a>
            </li>
            
          </ul>
        </nav>
      </div>
    </>
  );
};
export default QuanlyloaivacxinIndex;