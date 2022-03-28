import axios from "axios";
import authHeader from "../auth-header";

const API_URL = "http://localhost:8080/congthongtin/";

const deleteCalendar = (id) =>{
        if(!id) return ;
        const headers = {
                'Content-Type': 'application/json',
                ...authHeader()
              }
        return axios.delete(API_URL +`admin/calendar/${id}` , { data:null, headers : headers})
} 

 function  getCalendar(page) {
        if(!page) page=0;
        const headers = {
                'Content-Type': 'application/json',
                ...authHeader()
              }
        return axios.get(API_URL +`admin/calendar/${page}`,{ headers:headers } )  
              
        }
     

const getDataFilter = (district , ward) =>{
        let url_getdata = API_URL +"admin/data/create";
        if(district!=null)
        url_getdata = url_getdata +"?district=" +district;
        if (district!=null && ward!=null)
        url_getdata = url_getdata +"&ward=" +ward;
        return axios.get(url_getdata ,
                { headers: authHeader() }
                );
}

 function createCalendar(dateInject,idAddress,idVaccine) {
        const headers = {
                'Content-Type': 'application/json',
                ...authHeader()
              }
       //  console.log(headers);
        return axios.post(API_URL +`admin/calendar?dateInject=${dateInject}&idAddress=${idAddress}&idVaccine=${idVaccine}`, null, {
                headers :headers },
        );
       
      }
      

export default {
        getDataFilter,
        getCalendar,
        createCalendar,
        deleteCalendar
}