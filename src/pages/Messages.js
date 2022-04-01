import React, { useState,useEffect } from "react"
import {useHistory } from "react-router-dom"
import { useAuth } from "../authContexts/AuthContext"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.min.css';
import Box from '@mui/material/Box';
import PrimarySearchAppBar from '../components/Navbar'
import Avatar from '@mui/material/Avatar';
import {Card } from "react-bootstrap"
import "./css/pages.css"
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Stack from '@mui/material/Stack';
import {database} from "../firebase"
export default function Profile() {
    const { currentUser } = useAuth()
    const [data,setData] = useState({});
    document.title="Haya ngajdro - Messages "
    const table = "listMessages/"+currentUser.displayName
    const table2 = "user/"+currentUser.displayName
  const history = useHistory()
  database.ref(table2).update({"messageNonLu" : "0"})
  useEffect (()=> {
    database.ref(table).orderByChild('lastMessage').on("value",(snapshot)=>{
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
    return(
        <>
            <PrimarySearchAppBar / >
            <div style={{
                marginTop:"150px"
            }} className="container">
{Object.keys(data).map((id,index)=>{
                    return(
                        <>
                <Card className="isround mb-3">    
        <Card.Body>
        <Stack direction="row mb-3" spacing={5}>
           <Avatar src="" />
           <Box sx={{ flexGrow: 0 }} />
           <a onClick={() => history.push("/user/"+ data[id].userRecive)} ><p className="name">{data[id].userRecive}</p></a>
           <Box sx={{ flexGrow: 1 }} />
           <IconButton  onClick={() => history.push("/message/"+ data[id].userRecive)} edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
           </Stack>
           
           </Card.Body>
           </Card>
</>
                    )})}
            </div>
        </>
    )
}