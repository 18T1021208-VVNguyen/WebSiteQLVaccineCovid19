
import Login from "./components/Login.js"
import Home from "./components/Home.js";
import Navbar from "./components/Navbar.js"
import Register from "./components/Register.js";
import { BrowserRouter,Route, Switch } from "react-router-dom";
import AdminCalendar from "./components/Admin/CalendarAdmin.js";
import Profile from "./components/User/Profile.js";
import RegisterInject from "./components/RegisterInject.js";
import RegisterHistory from "./components/User/RegisterHistory.js";
import InjectHistory from "./components/User/InjectHistory.js";
import DetailNews from "./components/DetailNews.js";
import UpdateProfile from "./components/User/UpdateProfile.js";

import NewsAdmin from "./components/Admin/NewsAdmin.js";
import DetailNewsAdmin from "./components/Admin/DetailNewsAdmin.js";

import Footer from "./components/Footer.js";
import React from "react";

import QuanlyloaivacxinIndex from "./components/Admin/QuanlyloaivacxinIndex.js";
import Quanlyloaivacxin from "./components/Admin/Quanlyloaivacxin.js";
import QuanlyvacxinIndex from "./components/Admin/QuanlyvacxinIndex.js";
import Quanlyvacxin from "./components/Admin/Quanlyvacxin.js";

import Danhsachdangkytiem from "./components/Admin/Danhsachdangkytiem.js";
import Danhsachdatiem from "./components/Admin/Danhsachdatiem.js";
import Danhsachhuytiem from "./components/Admin/Danhsachhuytiem.js";

function App() {
  return (
    <BrowserRouter>
        <div>
            <Navbar />  
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/detailnew/:id" component={DetailNews}></Route>
                <Route path="/admin-news" component={NewsAdmin}></Route>
                <Route path="/admin/detailnew/:id" component={DetailNewsAdmin}></Route>

                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/> 
                <Route path="/update-profile" component={UpdateProfile}></Route>

                <Route path="/RegisterInject" component ={RegisterInject}/>
                <Route path="/registerhistory" component = {RegisterHistory}/>
                <Route path="/Injecthistory" component ={InjectHistory}/>

                <Route path="/calendar" component={AdminCalendar}/> 

                {/* /quan-ly-loai-vacxin-index */}
                <Route path="/quan-ly-loai-vacxin-index" component={QuanlyloaivacxinIndex}></Route>
                <Route path="/admin/categoryvaccine/:id" component={Quanlyloaivacxin}></Route>
                <Route path="/quan-ly-vacxin-index" component={QuanlyvacxinIndex}></Route>
                <Route path="/admin/vaccine/:id" component={Quanlyvacxin}></Route>
                <Route path="/quan-ly-danh-sach-dang-ky-tiem" component={Danhsachdangkytiem}></Route>
                <Route path="/quan-ly-danh-sach-da-tiem" component={Danhsachdatiem}></Route>
                <Route path="/quan-ly-danh-sach-huy-tiem" component={Danhsachhuytiem}></Route>
            </Switch>
            <Footer/>
        </div>
      </BrowserRouter>

            
          
    
   
  );
}

export default App;
