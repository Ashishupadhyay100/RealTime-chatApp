import React, { useEffect, useState } from 'react';
import {user} from "../Join/Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import Message from '../Message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";
import crossIcon from "../../images/cross.png";


const ENDPOINT = "https://new-real-time-chat-app.herokuapp.com/";
let socket; 
const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([]);

  const send = ()=>{
      const message = document.getElementById("inputtext").value;
      socket.emit("message",{message,id});
      document.getElementById("inputtext").value=("");
    }

console.log(messages);

 useEffect(() => {
     socket = socketIO(ENDPOINT,{transports:['websocket']});        

    socket.on("connect",()=>{
        alert("connected");
        setid(socket.id);
    })
    
    console.log(socket);
    socket.emit('joined',{user});

    socket.on('welcome', (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.message);
    })

    socket.on('userJoined', (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.message);
    })

    socket.on('leave', (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.message)
    })

    return () => {
        socket.emit('disconnect');
        socket.off();
    }
}, [])

useEffect(() => {
    socket.on('sendMessage',(data)=>{
        setMessages([...messages, data]);
        console.log(data.user, data.message, data.id);
    })

    return () => {
       socket.off(); 
    }
}, [messages])


    return (
        <div>
           <div className="chatPage">
               <div className="chatContainer">
                   <div className="header">
                      <h2>ChatApp</h2> 
                      <a href="/"><img src={crossIcon} alt="Cross"></img></a>
                   </div>
                   <ReactScrollToBottom className="chatBox">
                      {messages.map((item, i)=> <Message user={item.id===id?"":item.user} message={item.message} classs={item.id===id?"right":"left"} />)}
                   </ReactScrollToBottom>
                   <div className="input">
                    <input onKeyPress={(event)=>event.key==="Enter"?send():null} id="inputtext"type="text"></input>
                    <button onClick={send} id="btn">
                        <img src="send.png" alt="send img"></img>
                    </button>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default Chat
