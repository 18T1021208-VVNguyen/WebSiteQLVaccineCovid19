import axios from "axios";
import authHeader from "../auth-header";

const API_URL = "http://localhost:8080/congthongtin";

const  getCategory=(_page) =>{
    if(!_page) _page=0;
    const headers = {
            'Content-Type': 'application/json',
            ...authHeader()
          }
    return axios.get(API_URL +`/admin/categoryvaccine?_page=${_page}`,{ headers:headers } )  
          
}

const createCategory=(data) =>{

    const headers = {
        'Content-Type': 'application/json',
        ...authHeader()
    }
    console.log(headers);
    return axios.post(API_URL+`/admin/categoryvaccine`, data, {headers  :headers},);
}


const CategoryById = (id) => {
    const headers = {
        'Content-Type': 'application/json',
        ...authHeader()
    }
    console.log(headers);
    return axios.get(API_URL+`/admin/categoryvaccine/${id}`, {headers  :headers},);
};

const updateCategory=(data) =>{

    const headers = {
        'Content-Type': 'application/json',
        ...authHeader()
    }
    console.log(headers);
    return axios.put(API_URL+`/admin/categoryvaccine`, data, {headers  :headers},);
}


const deleteCalendar = (id) =>{
    if(!id) return ;
    const headers = {
            'Content-Type': 'application/json',
            ...authHeader()
          }
    return axios.delete(API_URL +`/admin/categoryvaccine/${id}` , {  headers : headers})
} 
export default {
    getCategory,
    createCategory,
    CategoryById,
    updateCategory,
    deleteCalendar
    
};