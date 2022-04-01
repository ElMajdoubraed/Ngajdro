import React, { useState,useEffect,useRef } from "react"
import { useParams , useHistory } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.min.css';
import {Card } from "react-bootstrap"
import PrimarySearchAppBar from '../components/Navbar'
import "./css/pages.css"
import {database} from "../firebase"
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

export default function Search() {
    const history = useHistory()
    document.title="Haya ngajdro - Search "
    const [data,setData] = useState({});
    const {name} = useParams();
    const searchRef = useRef()
    async function handleSubmit(e) {
        e.preventDefault()
        history.push("/search/"+searchRef.current.value)
    }
  useEffect (()=> {
    database.ref("users").on("value",(snapshot)=>{
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
    return(
        <>
            <PrimarySearchAppBar / >
            <div style={{
                backgroundcolor:"#6b6464 !important",
                marginTop:"100px"
            }} className="container">
           
        <form onSubmit={handleSubmit} >
            <div className="row">
                <div className="col-9 col-xl-10">
                <input id="search" name="search" ref={searchRef} className="input is-rounded mb-3" type="search" placeholder="Search"  required></input>
                </div>
                <div className="col-3 col-xl-2">
                    <button type="submit" className="button is-link is-rounded" >Search</button>
                </div>
            </div>
          
        </form>
        <div className="row mt-5">
        {Object.keys(data).map((id,index)=>{
                    return(
                        <>
            {data[id].name !== name ? <></> :             
           <Card className="isround mb-3 col-xl-12 col-10">    
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