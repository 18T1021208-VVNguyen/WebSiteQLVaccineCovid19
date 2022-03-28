import axios from "axios";
import authHeader from "../auth-header";


const API_URL = "http://localhost:8080/congthongtin/";

const getHistory = () =>{
     return axios.get(API_URL +"history" ,{headers : authHeader()} )
}
const createHistory = (customerid,historyDTO) =>{
     const params = {
         customerid
     }
    return axios.post(API_URL +`history`, historyDTO , { 
        params : params,
        headers : authHeader()
    })
}
const deleteHistory = (id) =>{
    return axios.delete(API_URL +`history/${id}` ,{headers : authHeader() } )
}

export default {
    getHistory,
    createHistory,
    deleteHistory
}