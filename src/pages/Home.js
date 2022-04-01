import React, { useState,useEffect } from "react"
import { useHistory } from "react-router-dom"
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
import { useAuth } from "../authContexts/AuthContext"
export default function Home() {
    const [data,setData] = useState({});
    const { currentUser } = useAuth()
    document.title="Haya ngajdro - Home " 
    useEffect (()=> {
        database.ref("users").limitToLast(100).on("value",(snapshot)=>{
            if(snapshot.val()!==null){
                setData({...snapshot.val()});
            }else{
                setData({});
            }
        });
        return()=>{
            setData({});
        };
  
    },[]);
    const history = useHistory()
    return(
        <>
            <PrimarySearchAppBar / >
            <div style={{
                backgroundcolor:"#6b6464 !important",
                marginTop:"150px"
            }} className="container">
                <h1 style={{visibility: "hidden"}}>Haya ngajdro last accounts</h1>
                <div className="row">
                {Object.keys(data).map((id,index)=>{
                    return(
                        <>
            {currentUser.displayName === data[id].name ? <></> :             
           <Card className="isround mb-3 col-xl-5 col-10 offset-1">    
        <Card.Body>
        <Stack direction="row mb-3" spacing={15}>
           <Avatar src={data[id].pictureUrl} />
           <Box sx={{ flexGrow: 0 }} />
           <a onClick={() => history.push("/user/"+ data[id].name)} ><p className="name">{data[id].name}</p></a>
           <Box sx={{ flexGrow: 1 }} />
           <IconButton edge="end" onClick={() => history.push("/message/"+ data[id].name)} aria-label="comments">
                <CommentIcon   />
              </IconButton>
           </Stack>
           
           </Card.Body>
           </Card>}
           </>)
           })}
           </div>
            </div>
        </>
    )
}