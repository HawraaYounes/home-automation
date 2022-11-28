import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Album from '../components/album/album';
import Popup from 'reactjs-popup';
import '../components/create/create.css';
import '../components/album/album.css';
import 'reactjs-popup/dist/index.css';
import Sidebar from'../components/sidebar/Sidebar';
function Memory() {

  const [albums, setAlbums] = useState([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const handleClick=() => {
    const data = {
       name
    };
    console.log(name);
    axios.post(`http://192.168.0.108:8000/api/auth/new-album`,data,{ headers: { 'Authorization': localStorage.getItem(`token`)} }).then((res) => {
        getAlbums();
        setOpen(false);
    }).catch((error) => {
        console.log(error)
    });
}
  const getAlbums =() => {
    axios.get("http://192.168.0.108:8000/api/auth/albums",{ headers: { 'Authorization': localStorage.getItem(`token`)} })
    .then((res)=>{  
       setAlbums(res.data);
    })
    .catch(error => console.log(`Error: ${error}`));
 };
  useEffect(() => {
        getAlbums();
    }, []);
    return (
      <>
      <Sidebar/>
      <div>
      <button type="button" className="button add" onClick={() => setOpen(o => !o)}>Add Album</button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>&times;</a>
          <form>
          <div className="input-container">		
		    <input type="text" required="" name="albumName" placeholder='Album Name' value={name} onChange={e=>setName(e.target.value)}/>
	      </div>
          <button type="button" className="button add-album" onClick={()=> handleClick()}> Add </button>
          </form>
        </div>
      </Popup>
    </div>
    <div className='albums'>
      { albums.map((h) => (
            <Album text={h.name} key={h.id} id={h.id} />
          ))}
      </div>
      </>
    );
  }

    


export default Memory;