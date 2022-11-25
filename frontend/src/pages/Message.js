import { useEffect, useState } from "react";
import axios from 'axios';
import Pusher from 'pusher-js';
import Sidebar from '../components/sidebar/Sidebar';
import Chat from '../components/chat/chatlist';
import '../components/chat/chatlist.css';

function Message() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const handleSubmit=(e) => {
        e.preventDefault();
        const data =new FormData();
        data.append('message', message);
        data.append('sender_id', localStorage.getItem("userID"));
        data.append('username', localStorage.getItem("username"));
        axios.post(`http://192.168.0.108:8000/api/auth/message`, data, { headers: { 'authorization': localStorage.getItem(`token`)} })
        .then(response => { 
            console.log(localStorage.getItem("token"))
            getMesages();
            setMessage(''); })
            .catch((err) => { alert(err) });
    }
    console.log(localStorage.getItem("token"))
    const getMesages =async() => {
         axios.get("http://192.168.0.108:8000/api/auth/messages",{ headers: { 'Authorization': localStorage.getItem(`token`)} })
        .then((res)=>{  
           setMessages(res.data);
        })
        .catch(error => console.log(`Error: ${error}`));
     };
     useEffect(() => {
        getMesages();
    }, []);
    console.log(messages)
  return (
    <div>
        <Sidebar/>
        <div className="margin-left"> 
        <div className="messages-div">
           { messages.map((d) => (
                d.sender_id==localStorage.getItem("userID")
                ? (<Chat username={d.username} key={d.id} content={d.message} status={"sent"}/>)
                :<Chat  username={d.username} key={d.id}  content={d.message} status={"received"}/>
            ))
           }
            
        </div>
            <form onSubmit={handleSubmit}>
            <div className="message-input">		
                <input type="text" required="" placeholder='Type your message ...' value={message} onChange={e=>setMessage(e.target.value)}/>
            </div>
            </form>
        </div>
    </div>
  );
}
export default Message
