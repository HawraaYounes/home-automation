import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import '../components/temperature/temperature.css'
import Temperature from '../components/temperature/temperature';

let text;

function Home() {
  const [temperature, setTemperature] = useState('');
  useEffect(() => {
        getTemperature();
    }, [temperature]);

    const getTemperature =async() => {
       await axios.get("http://127.0.0.1:8000/api/last-temperature")
       .then((res)=>{  
          setTemperature(res.data.value);
       })
       .catch(error => console.log(`Error: ${error}`));
     
    };
    if(temperature){
     
        if(temperature>20) 
         text="Welcome home! Weather is very hot today! Keep your mind cool "
          else if (temperature<=20 && temperature>10)
          text="Welcome home! The air quality is good and fresh, you can go out today."
          else if (temperature<=10)
           text="Welcome home! Weather is very clod today! Keep your heart warm"
       

     
    return (
      <>
      <h1 className='header margin-left'>Home</h1>
      <Temperature temperature={temperature} text={text}/>
      </>
    );
  }
  return <></>
    
}
  
export default Home;