import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import '../components/temperature/temperature.css'
import Temperature from '../components/temperature/temperature';
import ToggleSwitch from '../components/toggleSwitch/toggleSwitch';
import Chart from "react-apexcharts";
import MyCharts from '../components/chart/chart'
let text;

function Home() {
  const [temperature, setTemperature] = useState('');
  const [devices, setDevices] = useState('');
  const [averageTemp, setAverageTemp] = useState([]);
  const [date, setDate] = useState([]);
  ////Chart start
  useEffect(() => {
    const getData = async () => {
    const url = 'http://localhost:8000/api/temperature';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAverageTemp(data?.map((item) => item.value));
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
    }
  ];
  const options = { //data on the x-axis
  chart: { id: 'bar-chart'},
  xaxis: {
    categories: date
  },
  stroke: {
    curve: 'smooth',
  },
  fill: {
    type: 'solid' 
  },
  colors:['#B16042']
};

/////Chart end
  //turn on function
  const turnOn=async(id) => {
    await axios.get(`http://localhost:8000/api/device/on/${id}`).then((res)=>{
     getDevices();
    }).catch(error => console.log(`Error: ${error}`));
  };
  //turn off function
  const turnOff=async(id) => {
    await axios.get(`http://localhost:8000/api/device/off/${id}`).then((res)=>{
     getDevices();
    }).catch(error => console.log(`Error: ${error}`));
  };
  
  
  //temperature
  useEffect(() => {
        getTemperature();
    }, []);

  const getTemperature =async() => {
     await axios.get("http://127.0.0.1:8000/api/last-temperature")
     .then((res)=>{  
        setTemperature(res.data.value);
     })
     .catch(error => console.log(`Error: ${error}`));

  };
  //devices
  const getDevices =async() => {
    await axios.get("http://127.0.0.1:8000/api/devices")
    .then((res)=>{  
       setDevices(res.data);
    })
    .catch(error => console.log(`Error: ${error}`));
  
 };
 useEffect(() => {
   getDevices();
}, []);


    if(temperature && devices){
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
      <div className='control'>
      { devices.map((d) => (
      d.status===0
       ? (<ToggleSwitch color='off' label={d.name} id={d.id} key={d.id} turn={turnOn}/>)
       :<ToggleSwitch color='on' label={d.name} id={d.id} key={d.id} turn={turnOff}/>
          
      ))}
      </div>
     
      <Chart className='margin-left'
      options={options}
      series={series}
      type="line"
      width="450"
    />
      </>
    );
  }
  return <></>
    
}
  
export default Home;