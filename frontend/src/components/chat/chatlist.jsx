import React from "react";
import "./chatlist.css";
export default function Chat({content,username,status}) {
  return(
       <>
        <div className={status}>
            <h4>{username}</h4>
            <p>{content}</p>
        </div>
       </>
  )

 }


   