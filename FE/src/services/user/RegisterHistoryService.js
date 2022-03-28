
import axios from "axios";
import authHeader from "../auth-header";

const API_URL = "http://localhost:8080/congthongtin/";

const getRegisterHistory = (idCustomer) =>{
    return axios.get(API_URL +`registerinjection/${idCustomer}`, { headers : authHeader() })
}

const removeRegister = (registerId)=>{
    return axios.delete(API_URL +`registerinjection/${registerId}` ,{headers : authHeader()})
}
export default { getRegisterHistory,removeRegister }