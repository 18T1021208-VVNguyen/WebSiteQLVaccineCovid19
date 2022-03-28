import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/congthongtin/";
// lấy lịch tiêm 
const GetCalendarPublic = (customerid,district,ward,page) =>{
    let params = {}
    if(customerid)
       params.customerid = customerid;
    if(district)
        params.district =district;
    if(ward)
        params.ward =ward;
    if(page) 
        params.page = page;
    return axios.get(API_URL +"calendar" , {params : params});
};

// Đăng ký tiêm
const InjectCalendar = (customerid,calendarid,numinjec) =>{
    let params = {
        customerid,
        calendarid,
        numinjec
    }
    console.log("param đăng kí");
    console.log(params);    
    return axios.post(API_URL+"registerinjection",null ,{
            headers : authHeader(),
            params : params
    })
}
export default {
    GetCalendarPublic,
    InjectCalendar
}