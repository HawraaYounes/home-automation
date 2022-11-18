import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Album from '../components/album/album';
import Popup from 'reactjs-popup';
import '../components/create/create.css';
import 'reactjs-popup/dist/index.css';
let album_id=parseInt(localStorage.getItem('albumID'));
console.log(album_id)
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
    formData.append('album_id', album_id);
    formData.append('details', details);
 
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept':'application/json'
      },
    };
    console.log( image)
    axios.post(`http://localhost:8000/api/new-memory`,formData,config).then((res) => {
        console.log(res.data);
        setOpen(false);
    }).catch((error) => {
        console.log(error)
    });
}
  const getImages =() => {
    axios.get(`http://127.0.0.1:8000/api/memories/${album_id}`)
    .then((res)=>{  
        console.log(res.data);
       setImages(res.data);
    })
    .catch(error => console.log(`Error: ${error}`));
 };
  useEffect(() => {
        getImages();
    }, []);
    return (
      <>
      <div>
      <button type="button" className="button" onClick={() => setOpen(o => !o)}>Add Image</button>
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
          <img src={`http://127.0.0.1:8000/assets/uploads/1668779311.PNG`}/>
        </>
          ))}
    </div>
      </>
    );
  }

export default Image;