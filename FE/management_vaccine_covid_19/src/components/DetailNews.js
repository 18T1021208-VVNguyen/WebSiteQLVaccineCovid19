import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PublicService from "../services/PublicService";

function DetailNews() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { id } = useParams();

  useEffect(()=>{
    if(id){
        PublicService.findById(id).then(res=>{
            setTitle(res.data.title);
            setContent(res.data.content);
        })
        .catch(error=>{
         console.log("Create User Fail", error);
         })
    }},[])

  return (
    <>
      <div>
        <h5 className="well font-weight-bold text-primary">
          TRANG CHỦ
        </h5>
        <div className="col-lg-12" style={{padding:"0px 100px"}}>
          <div className="row">
            <h6 className="text-primary ">{title}</h6>
          </div>
          <div className="row " style={{paddingTop:"20px"}}>
            <p>{content}</p>
          </div>

          <div className="row d-flex justify-content-center">
          <Link to={"/"}><button type="button" className="button">Thoát</button></Link>
          </div>
        </div>
       
      </div>
    </>
  );
}
export default DetailNews;