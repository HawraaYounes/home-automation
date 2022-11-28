import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Album from '../components/album/album';
import Popup from 'reactjs-popup';
import '../components/image/image.css';
import 'reactjs-popup/dist/index.css';
import '../components/sidebar/Sidebar';
import Sidebar from '../components/sidebar/Sidebar';
import Img from '../components/image/image';





function Image() {
  const [images, setImages] = useState([]);
  const [details, setDetails] = useState('');
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  
  function handleChange(event) {
    setImage(event.target.files[0])
  }
  const handleClick=(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('path', image);
    formData.append('album_id',window.location.href.split("/")[4]);
    formData.append('details', details);
 
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept':'application/json',
        'Authorization': localStorage.getItem(`token`)
      },
      
    };
    console.log( image)
    axios.post(`http://192.168.0.108:8000/api/auth/new-memory`,formData,config).then((res) => {
        console.log(res.data);
        setOpen(false);
        getImages();
    }).catch((error) => {
        console.log(error)
    });
}
  const getImages =() => {
    const id=window.location.href.split("/")[4]
   console.log(id)
    axios.get(`http://192.168.0.108:8000/api/auth/images/${id}`,{ headers: { 'Authorization': localStorage.getItem(`token`)} })
    .then((res)=>{  
       setImages(res.data);
       console.log(images)
    })
    .catch(error => console.log(`Error: ${error}`));
 };
  useEffect(() => {
        getImages();
    }, []);
    if(images){
    return (
      <>
      <Sidebar/>
      <div>
      <button type="button" className="button add" onClick={() => setOpen(o => !o)}>Add Image</button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>&times;</a>
          <form onSubmit={handleClick}>
          <div className="input-container">		
		    <input type="text" required="" placeholder='Image details' value={details} onChange={e=>setDetails(e.target.value)}/>
	      </div>
          <input type="file" onChange={handleChange} />
          <button type="submit" className="button"> Add Image</button>
          </form>
        </div>
      </Popup>
      
      { images.map((h) => (
        <>
        <div class="images">
          <Img path={`http://192.168.0.108:8000/uploads/${h.path}`} text={h.details}/>
    
          </div>
        </>
          ))}
    </div>
      </>
    );
  }
  }

export default Image;