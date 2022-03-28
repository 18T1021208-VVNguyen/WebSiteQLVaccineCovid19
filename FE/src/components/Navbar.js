import React, { useState ,useEffect } from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import NavbarAdmin from "./Admin/NavbarAdmin";
import NavbarUser from "./User/NavbarUser";
import PublicService from "../services/PublicService";

function Navbar() {

  const[isAdmin,setIsAdmin] =useState(false);
  const[isUser,setIsUser] = useState(true);
  const [check , setCheck] = useState(false);
  const [name,setName] = useState("")
  useEffect(() =>{
      const user = PublicService.getCurrentUser();
      if(user)
      {
          if(user.roles.includes("ROLE_USER"))
          {
              setCheck(true);
              
          }
          else if(user.roles.includes("ROLE_ADMIN")){
                setIsAdmin(true);
                setIsUser(false);
               
          }

          if(user.customerName)
            setName(user.customerName);
      }
     
  },[])
  return (
    <>
      <nav className="no_navbar">
        <Link to= "/" className="no_navbar-logo" >
          <img
            src="https://tiemchungcovid19.gov.vn/assets/portal/img/u7.png"
            alt="covid19"
            width="50px"
          />
        </Link>

        <Link to="/" className="no_navbar-logo" >
          <h1 className="no_h1">
            CỔNG THÔNG TIN PHÒNG COVID19 TỈNH THỪA THIÊN HUẾ
          </h1>
        </Link>

        <ul className="no_nav-menu">

           
            
            { isAdmin && <NavbarAdmin name={name}/> }
          { isUser && < NavbarUser check={check} name={name}/> }
        </ul>

      </nav>
    </>
  );
}

export default Navbar;