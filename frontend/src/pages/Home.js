import React from 'react';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import '../components/temperature/temperature.css'
import Temperature from '../components/temperature/temperature';
import ToggleSwitch from '../components/toggleSwitch/toggleSwitch';
import Chart from "react-apexcharts";
import '../components/sidebar/Sidebar';
import Sidebar from '../components/sidebar/Sidebar';

let text;

function Home() {
  const [authenticated, setauthenticated] = useState(localStorage.getItem('authenticated'));
  const [temperature, setTemperature] = useState('');
  const [devices, setDevices] = useState('');
  const [averageTemp, setAverageTemp] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [date, setDate] = useState([]);

  //Check Authentication 
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('authenticated'))
    console.log(JSON.parse(localStorage.getItem('authenticated')))
    if (loggedInUser) {
      console.log("hiii")
      setauthenticated(loggedInUser);
    }
  }, []);
  console.log(authenticated)
  ////Chart start
  useEffect(() => {
    const getData = async () => {
    const url = 'http://192.168.0.108:8000/api/temperature';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAverageTemp(data?.map((item) => item.temperature));
      setHumidity(data?.map((item) => item.humidity));
      setDate(data?.map((item) => item.created_at));
    } catch (error) {
        console.log(error);
    }
  };
    getData();
  }, []);

 const series = [ //data on the y-axis
    {
      name: "Temperature in Celsius",
      data: averageTemp
    },{
      name: "Humidity",
      data: humidity
    }
  ]
  const options = { //data on the x-axis
  chart: {  
    height: 450,
    type: 'line',
    id:"bar-chart",
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
  },
 
  xaxis: {
    type: 'datetime',
    categories: date
  },
  stroke: {
    curve: 'smooth',
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    },
  },
  fill: {
    type: 'solid' 
  },
  zoom: {
    enabled: false
  },
  colors:['#B16042','#655D5B']
  
};

/////Chart end
  //turn on function
  const turnOn=async(id) => {
    const formData = new FormData();
    formData.append('id', id);
    await axios.post(`http://192.168.0.108:8000/api/device/on`,formData).then((res)=>{
     getDevices();
    }).catch(error => console.log(`Error: ${error}`));
  };
  //turn off function
  const turnOff=async(id) => {
    const formData = new FormData();
    formData.append('id', id);
    await axios.post(`http://192.168.0.108:8000/api/device/off`,formData).then((res)=>{
     getDevices();
    }).catch(error => console.log(`Error: ${error}`));
  };
  
  //temperature
  useEffect(() => {
        getTemperature();
    },[]);

  const getTemperature =async() => {
     await axios.get("http://192.168.0.108:8000/api/last-temperature")
     .then((res)=>{  
        setTemperature(res.data.temperature);
     })
     .catch(error => console.log(`Error: ${error}`));

  };
  //devices
  const getDevices =async() => {
    await axios.get("http://192.168.0.108:8000/api/devices")
    .then((res)=>{  
       setDevices(res.data);
    })
    .catch(error => console.log(`Error: ${error}`));
  
 };
 useEffect(() => {
   getDevices();
}, []);
if (!authenticated) {
  return <Navigate replace to="/login" />;
  }
else{
    if(temperature && devices){
        if(temperature>20) 
         text="Welcome home! Weather is very hot today! Keep your mind cool "
          else if (temperature<=20 && temperature>10)
          text="Welcome home! The air quality is good and fresh, you can go out today."
          else if (temperature<=10)
           text="Welcome home! Weather is very cold today! Keep your heart warm"
    return (
      <>
      <Sidebar/>
      <h1 className='header margin-left'>Home</h1>
      <Temperature temperature={temperature} text={text}/>
      <div className='control'>
      { devices.map((d) => (
      d.status===0
       ? (<ToggleSwitch label={d.name} id={d.id} key={d.id} turn={turnOn} status={d.status}/>)
       :<ToggleSwitch label={d.name} id={d.id} key={d.id} turn={turnOff}  status={d.status}/>
      ))}
      </div>
      <Chart className='margin-left' options={options} series={series} type="line" width="450"/>
      </>
    );
  }
      
}
}
  
export default Home;