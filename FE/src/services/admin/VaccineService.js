import axios from "axios";
import authHeader from "../auth-header";

const API_URL = "http://localhost:8080/congthongtin";

const  getVaccine = (_page) =>{
    if(!_page) _page=0;
    const headers = {
            'Content-Type': 'application/json',
            ...authHeader()
          }
    return axios.get(API_URL +`/admin/vaccine?_page=${_page}`,{ headers:headers } )  
          
}

const  getData = () =>{
    const headers = {
            'Content-Type': 'application/json',
            ...authHeader()
          }
    return axios.get(API_URL +`/admin/data`,{ headers:headers } )  
          
}

const VaccineById = (id) => {
    const headers = {
        'Content-Type': 'application/json',
        ...authHeader()
    }
    console.log(headers);
    return axios.get(API_URL+`/admin/vaccine/${id}`, {headers  :headers},);
};

const createVaccine = (data) => {

    const headers = {
        'Content-Type': 'application/json',
        ...authHeader()
    }
    console.log(headers);
    return axios.post(API_URL+`/admin/vaccine`, data, {headers  :headers},);
}
const updateVaccine=(data) =>{

    const headers = {
        'Content-Type': 'application/json',
        ...authHeader()
    }
    console.log(headers);
    return axios.put(API_URL+`/admin/vaccine`, data, {headers  :headers},);
}
const deleteVaccine = (id) =>{
    if(!id) return ;
    const headers = {
            'Content-Type': 'application/json',
            ...authHeader()
          }
    return axios.delete(API_URL +`/admin/vaccine/${id}` , {  headers : headers})
} 
export default {
    getVaccine,
    getData,
    VaccineById,
    createVaccine,
    updateVaccine,
    deleteVaccine
    
};