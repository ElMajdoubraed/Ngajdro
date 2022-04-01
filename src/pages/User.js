import React,{useState,useEffect} from "react"
import {useHistory,useParams } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.min.css';
import PrimarySearchAppBar from '../components/Navbar'
import Avatar from '@mui/material/Avatar';
import "./css/pages.css"
import {database} from "../firebase";
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';

export default function User(props) {
  const [user, setUser] = useState([])
    const history = useHistory()
    const {id} = useParams();
    const table = "user/"+id
    document.title="Haya ngajdro - User - " +id;
    function goToMessage(){
        history.push("/message/"+id)
    }
    useEffect (()=> {
      database.ref(table).on("value",(snapshot)=>{
          if(snapshot.val()!==null){
              setUser({...snapshot.val()});
              console.log(user)
          }else{
              setUser({});
          }})
          return()=>{
              setUser({});
          };
      });
          if(!id){
            history.push("/profile")
          }

    return(
        <>
            <PrimarySearchAppBar / >
            <div style={{
                backgroundcolor:"#6b6464 !important",
                marginTop:"100px"
            }} className="container">
                <div className="divcenter">
           <Avatar  src={user.urlPicture}  sx={{ width: 100, height:100 }}/> 
</div>
<hr style={{border:"1px solid blue"}}></hr>
<div className="row">
<div className="col-xl-6">
{user.name ?<><h1 className="nameUser">Email : {user.name}</h1></> : <></> }
{user.email ?<><h1 className="nameUser">Email : {user.email}</h1></> : <></> }
</div>
<div className="col-xl-6">
{user.birthday ?<><h1 className="nameUser">Birthday : {user.birthday}</h1></> : <></> }
{user.phone ?<><h1 className="nameUser">Phone Number : {user.phone}</h1></> : <></> }
</div>
</div>
            </div>
            <div id="send message" className="mt-5 mb-3 offset-xl-10 offset-9">
            <h1 style={{visibility: "hidden"}}>Haya ngajdro - gajder {user.name}</h1>
         <Fab onClick={goToMessage} sx={{p: 3, mr:200}} size="medium" color="primary"  aria-label="add">
        <SendIcon />
      </Fab>
      </div>
        </>
    )
}