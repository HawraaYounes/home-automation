import React from "react";
import "./toggleSwitch.css";
  
const ToggleSwitch = ({ label,turn,id}) => {
  return (
    <div className="c">
      {label}{" "}
      <div className="toggle-switch ">
        <input type="checkbox" className="checkbox " name={label} id={label} />
        <label className="label" htmlFor={label} onClick={() => turn(id)}>
          <span className="inner " />
          <span className="switch " />
        </label>
      </div>
    </div>
  );
};
  
export default ToggleSwitch;