import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './create.css';

const ControlledPopup = ({text,handleChange,handleClick}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <div className='popup'>
      <button type="button" className="button" onClick={() => setOpen(o => !o)}>
        {text}
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal} >
        <div className="modal">
          <a className="close" onClick={closeModal}>&times;</a>
          <form>
          <div className="input-container">		
		    <input type="text" required="" name="albumName" placeholder='Album Name' onChange={handleChange}/>
	      </div>
          <button type="button" className="button" onClick={e=> handleClick(e.target.albumName.value)}> Add </button>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default ControlledPopup;