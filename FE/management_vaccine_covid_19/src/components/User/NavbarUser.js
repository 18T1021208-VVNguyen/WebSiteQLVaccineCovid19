import {  FaRegListAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logout from "../Logout";
const Navbaruser= ({check,name}) =>{
   
    return (
        <>
         <li className="no_nav-item">
                <Link to="/" className="no_nav-links" > 
                      Trang chủ 
                </Link>
          </li>

        <li className="no_nav-item">
            <Link
              to="/RegisterInject"
              className="no_nav-links"
            >
              <FaRegListAlt className="no_icon-header" />
              Đăng ký tiêm
            </Link>
          </li>
      {
        check &&(
          <li className="no_nav-item" >
            <div  className="no_nav-links">
              <FaUserAlt className="no_icon-header" />
                {name }
                <ul className="no_menu-profile">
                <Link to="/profile" >
                    <li className="no_profile-iem">
                        <p className="no_profile-iem-p" > Hồ sơ cá nhân  </p>
                    </li>  
                </Link> 
                <Link to="/registerhistory" >
                    <li  className="no_profile-iem">
                       <p className="no_profile-iem-p"> Lịch sử đăng ký </p>     
                    </li> 
                </Link>
                <Link to="/Injecthistory"> 
                  <li  className="no_profile-iem">
                    <p className="no_profile-iem-p"> Lịch sử tiêm  </p>   
                  </li> 
                </Link>
                <li  className="no_profile-iem">
                          <Logout/>
                </li>
                </ul>    
            </div>
           
          </li>
        )
      }
      {
         !check && (
          <li className="no_nav-item">
          <Link
            to="/login"
            className="no_nav-links"
           
          >
            <FaRegListAlt className="no_icon-header" />
              Đăng Nhập
          </Link>

          <li className="no_nav-item">
            <Link
              to="/register"
              className="no_nav-links"  
            >
              <FaRegListAlt className="no_icon-header" />
                Đăng ký
            </Link>
          </li>
        </li>
         )
           
         
      }
          
         
        </>
    )
}
export default Navbaruser;