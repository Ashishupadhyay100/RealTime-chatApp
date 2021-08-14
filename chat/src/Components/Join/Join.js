import React, { useState } from 'react'
import "./Join.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";

let user;
const Join = () => {
    
const [name, setName] = useState("");

const handleButton = ()=>{
    user = document.getElementById("inputName").value;
    document.getElementById("inputName").value = "";
}

    return (
      <div className="JoinPage">
        <div className="JoinContainer">
            <img src={logo} alt="logo"></img>
            <h1>ChatApp</h1>
            <input onChange={(e)=>setName(e.target.value)} placeholder="Type your Name here" type="text" id="inputName"></input>
            <Link onClick={(event)=> !name?event.preventDefault():null} to="/chat"><button onClick={handleButton} className="btn">Start</button></Link>
        </div>
        </div>
    )
}

export default Join;
export {user};