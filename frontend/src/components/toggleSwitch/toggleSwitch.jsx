import React from "react";
import "./toggleSwitch.css";
  
const ToggleSwitch = ({ label,turn,id,status}) => {
  return (
    <div className="c">
      <p className="device-name">{label}</p>
      <div className="toggle-switch ">
        <input checked={status} type="checkbox" className="checkbox " name={label} id={label} />
        <label className="label" htmlFor={label} onClick={() => turn(id,label)}>
          <span className="inner " />
          <span className="switch " />
        </label>
      </div>
    </div>
  );
};
  
export default ToggleSwitch;