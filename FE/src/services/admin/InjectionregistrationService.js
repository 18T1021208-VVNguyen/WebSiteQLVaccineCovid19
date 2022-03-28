import axios from "axios";
import authHeader from "../auth-header";

const API_URL = "http://localhost:8080/congthongtin";

function  getRegistration(_page) {
    if(!_page) _page=0;
    const headers = {
            'Content-Type': 'application/json',
            ...authHeader()
          }
    return axios.get(API_URL +`/admin/injectionregistration?_page=${_page}`,{ headers:headers } )  
          
}
function  getConfirm(_page) {
    if(!_page) _page=0;
    const headers = {
            'Content-Type': 'application/json',
            ...authHeader()
          }
    return axios.get(API_URL +`/admin/injectionregistration/comfirn?_page=${_page}`,{ headers:headers } )  
          
}
function  getCancel(_page) {
    if(!_page) _page=0;
    const headers = {
            'Content-Type': 'application/json',
            ...authHeader()
          }
    return axios.get(API_URL +`/admin/injectionregistration/cancel?_page=${_page}`,{ headers:headers } )  
          
}


function  confirmRegistration(id) {
    const headers = {
            'Content-Type': 'application/json',
            ...authHeader()
          }
    return axios.get(API_URL +`/admin/injectionregistration/${id}`,{ headers:headers } )  
          
}

// const confirmRegistration = (id) =>{
//     if(!id) return ;
//     const headers = {
//             'Content-Type': 'application/json',
//             ...authHeader()
//           }
//           console.log(headers);
//     return axios.put(API_URL +`/admin/injectionregistration/${id}` , { headers : headers})
// } 

const cancelRegistration = (id) =>{
    if(!id) return ;
    const headers = {
            'Content-Type': 'application/json',
            ...authHeader()
          }
          console.log(headers);
    return axios.delete(API_URL +`/admin/injectionregistration/${id}` , { headers : headers})
} 
export default {
    getRegistration,
    getConfirm,
    getCancel,
    confirmRegistration,
    cancelRegistration
    
};