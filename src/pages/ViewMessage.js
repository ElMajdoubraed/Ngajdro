import React, { useRef,useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../authContexts/AuthContext"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.min.css';
import PrimarySearchAppBar from '../components/Navbar'
import "./css/pages.css"
import {Card } from "react-bootstrap"
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import {database} from "../firebase"

export default function ViewMessage() {
    const { currentUser } = useAuth()
    const {id} = useParams();
    const table0 = "Allmessages/"+currentUser.displayName+"/"+id
    const table1 = "Allmessages/"+id+"/"+currentUser.displayName
    const table2 = "listMessages/"+currentUser.displayName+"/"+id
    const table3 = "listMessages/"+id+"/"+currentUser.displayName
    document.title="Haya ngajdro - Message "
    const messageRef = useRef()
    const [data,setData] = useState({});
    useEffect (()=> {
      database.ref(table0).orderByChild('date').on("value",(snapshot)=>{
          if(snapshot.val()!==null){
              setData({...snapshot.val()});
          }else{
              setData({});
          }
      })
      return()=>{
          setData({});
      };
  
  });


 function sendMessage(){

   if(messageRef.current.value.length > 0 ){
      database.ref(table0).push({
         "message" :messageRef.current.value,
         "sender" :currentUser.displayName,
         "reciver":id,
         "date" : Date.now(),
         "Vu" : false,
       })
       database.ref(table1).push({
         "message" :messageRef.current.value,
         "reciver" :id,
         "sender":currentUser.displayName,
         "date" : Date.now(),
         "Vu" : false,
       })
      database.ref(table2).set({
            "userRecive" :id,
            "userName" :id,
            "lastMessage" : Date.now(),
            "Vu" : false,
          })
          database.ref(table3).set({
            "userRecive" :currentUser.displayName,
            "userName" :id,
            "lastMessage" : Date.now(),
            "Vu" : false,
          })

          const tableNb = "user/"+id
          database.ref(tableNb).on("value",(snapshot)=>{
                database.ref(tableNb).update({"messageNonLu" : snapshot.val()["messageNonLu"]+1})
          })
          

 }


 document.getElementById("message").value="";
}

    return(
        <>
            <PrimarySearchAppBar / >
            <div style={{
                backgroundcolor:"#6b6464 !important",
                marginTop:"100px"
            }} className="container">
<div id="space" className="space" >
               {Object.keys(data).map((i,index)=>{
                    return(
                        <>
                        {data[i]["sender"] === id ? 
                           <>
                           <Card className="isround col-8 messagerecive mb-3">    
        <Card.Body>
    
           {data[i]["message"]}
           </Card.Body>
           </Card>
           </>
                     :
<>
<Card className="isround col-8 offset-4 messagesend mb-3">    
        <Card.Body>
        {data[i]["message"]}
           </Card.Body>
           </Card>
           </>
                         }
                        </>)})}
               
         
           
</div>
<div className="fixed-bottom ">
<Card>
<Card.Body>
    <div className="row textmessage">
        <div className="col-10 col-xl-11">
                   <textarea id="message" wrap="none" name="message" ref={messageRef} minLength={1} rows={1} className="input is-rounded mb-3 textarea" type="text" placeholder="Message ..." required>
                </textarea>
                </div>
                <div className="col-1">
                <IconButton onClick={sendMessage} edge="end" aria-label="Send message">
                <SendIcon fontSize="large" color="primary"/>
              </IconButton>
                </div>
    </div>
                </Card.Body>
                </Card>
                </div>

            </div>
        </>
    )
}