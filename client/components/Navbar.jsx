import React from "react";


export default function Navbar(props) {
  return (
    <div className="nav-bar">      
      <span>CABI.NET</span><button className="logout" onClick={props.logout} >Logout</button>
    </div>
  )
} 
//add logout button