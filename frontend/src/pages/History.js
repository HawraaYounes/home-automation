import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import His from '../components/history/History';
import '../components/history/History.css';
import '../components/sidebar/Sidebar';
import Sidebar from '../components/sidebar/Sidebar';

function History() {
  const [histories, setHistories] = useState([]);
  const handleClick=async(id) => {
    await axios.get(`http://192.168.0.108:8000/api/auth/delete/${id}`,{ headers: { 'Authorization': localStorage.getItem(`token`)} }).then((res)=>{
      getHistories();
    }
    );
  };
  const getHistories =() => {
    axios.get("http://192.168.0.108:8000/api/auth/history",{ headers: { 'Authorization': localStorage.getItem(`token`)} })
    .then((res)=>{  
       setHistories(res.data);
     
    })
    .catch(error => console.log(`Error: ${error}`));
  
 };
  useEffect(() => {
        getHistories();
    }, []);
    if(histories){
    return (
      <>
      <Sidebar/>
      <h1 className='header margin-left'>History</h1>
          { histories.map((h) => (
            <His history={h} key={h.id} id={h.id} handleClick={handleClick}/>
          ))}
        
      </>
    );
  }
  return <></>
    
}

export default History;