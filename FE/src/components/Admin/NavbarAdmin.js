import { Link } from "react-router-dom";
import Logout from "../Logout";
import {  FaRegListAlt, FaUserAlt } from "react-icons/fa";

const Navbaradmin= ({name}) =>{

    return (
        <>
        <li className="no_nav-item">
            <Link to="/admin-news" className="no_nav-links" > 
                  Trang chủ 
            </Link>
        </li>
        
        <li className="no_nav-item">
            <Link to="/quan-ly-vacxin-index" className="no_nav-links" > 
                Quản lý vacxin 
            </Link>
        </li>

        <li className="no_nav-item">
            <Link  to="/quan-ly-loai-vacxin-index" className="no_nav-links">
               Quản lý loại vacxin 
            </Link>
        </li>

        <li className="no_nav-item" >
            <div  className="no_nav-links">
              
                Quản lý danh sách
                <ul className="no_menu-profile">
                    <li className="no_profile-iem">
                        <Link to="/quan-ly-danh-sach-dang-ky-tiem" className="no_profile-iem" > Danh sách đăng ký </Link>
                    </li>   
                    <li  className="no_profile-iem">
                        <Link to="/quan-ly-danh-sach-da-tiem" className="no_profile-iem" > Danh sách đã tiêm </Link>
                    </li> 
                    <li  className="no_profile-iem">
                        <Link to="/quan-ly-danh-sach-huy-tiem" className="no_profile-iem" > Danh sách huỷ tiêm </Link>
                    </li>
                </ul>    
            </div>
           
        </li>

          <li className="no_nav-item">
            <Link to={"/calendar"}  className="no_nav-links">
                 Quản lý lịch tiêm
             </Link>
          </li>

          <li className="no_nav-item" >
            <div  className="no_nav-links">
              <FaUserAlt className="no_icon-header" />
                {name || "Admin" }
                <ul className="no_menu-profile">
                    <li  className="no_profile-iem">
                          <Logout/>
                    </li>
                </ul>    
            </div>
           
          </li>
        </>
    )
}
export default Navbaradmin;


// import { Link } from "react-router-dom";
// import Logout from "../Logout";
// import {  FaRegListAlt, FaUserAlt } from "react-icons/fa";

// const NavbarAdmin= ({name}) =>{

//     return (
//         <>
//         <li className="no_nav-item">
//             <Link to="/" className="no_nav-links" > 
//                   Trang chủ 
//             </Link>
//         </li>

//         <li className="no_nav-item">
//             <Link to="/quan-ly-vacxin-index" className="no_nav-links" > 
//                 Quản lý vacxin 
//             </Link>
//         </li>

//         <li className="no_nav-item">
//             <Link  to="/quan-ly-loai-vacxin-index" className="no_nav-links">
//                Quản lý loại vacxin 
//             </Link>
//         </li>

//         <li className="no_nav-item" >
//             <div  className="no_nav-links">
              
//                 Quản lý danh sách
//                 <ul className="no_menu-profile">
//                     <li className="no_profile-iem">
//                         <Link to="/quan-ly-danh-sach-dang-ky-tiem" className="no_profile-iem" > Danh sách đăng ký </Link>
//                     </li>   
//                     <li  className="no_profile-iem">
//                         <Link to="/quan-ly-danh-sach-da-tiem" className="no_profile-iem" > Danh sách đã tiêm </Link>
//                     </li> 
//                     <li  className="no_profile-iem">
//                         <Link to="/quan-ly-danh-sach-huy-tiem" className="no_profile-iem" > Danh sách huỷ tiêm </Link>
//                     </li>
//                 </ul>    
//             </div>
           
//         </li>

//         <li className="no_nav-item">
//             <Link to="/quan-ly-lich-tiem-index"  className="no_nav-links">
//                  Quản lý lịch tiêm
//              </Link>
//         </li>

//         <li className="no_nav-item" >
//             <div  className="no_nav-links">
//               <FaUserAlt className="no_icon-header" />
//                 {name || "Admin" }
//                 <ul className="no_menu-profile">
//                     <li  className="no_profile-iem">
//                           <Logout/>
//                     </li>
//                 </ul>    
//             </div>
           
//           </li>
//         </>
//     )
// }
// export default NavbarAdmin;