import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import His from '../components/history/History';
import '../components/history/History.css'

function History() {
  const [histories, setHistories] = useState([]);
  const handleClick=async(id) => {
    await axios.get(`http://localhost:8000/api/delete/${id}`).then((res)=>{
      getHistories();
    }
    );
  };
  const getHistories =() => {
    axios.get("http://127.0.0.1:8000/api/history")
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
      <h1 className='header margin-left'>Home History</h1>
          { histories.map((h) => (
            <His history={h} key={h.id} id={h.id} handleClick={handleClick}/>
          ))}
        
      </>
    );
  }
  return <></>
    
}

export default History;