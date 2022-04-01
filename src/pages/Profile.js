import React ,{useEffect,useState} from "react"
import { Link} from "react-router-dom"
import { useAuth } from "../authContexts/AuthContext"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.min.css';
import PrimarySearchAppBar from '../components/Navbar'
import Avatar from '@mui/material/Avatar';
import "./css/pages.css"
import {database} from "../firebase";

export default function Profile() {
    const [user,setUser] = useState({});
    const { currentUser } = useAuth()
    document.title="Haya ngajdro - Profile - " + currentUser.displayName
    const table = "user/"+currentUser.displayName
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
<h1 style={{visibility: "hidden"}}>Haya ngajdro Profile</h1>
<div className="d-grid gap-2 justify-content-md-end">
  <Link to="/updateprofile"><button className="button is-link me-md-2 mb-3" type="button">Update Profile</button></Link>  
</div>
<div className="row">
<div className="col-xl-6">
<h1 className=" nameUser">Name : {user.name} </h1>
{currentUser.emailVerified ? <h1 className=" nameUser">Email : {currentUser.email} <span className="tag is-primary">Verified</span></h1> : 
<h1 className=" nameUser">Email : {currentUser.email} <span className="tag is-danger">Not Verified</span></h1>}
</div>
<div className="col-xl-6">
{user.birthday ?<><h1 className="nameUser">Birthday : {user.birthday}</h1></> : <></> }
{user.phone ?<><h1 className="nameUser">Phone Number : {user.phone}</h1></> : <></> }
</div>
            </div>
            </div>
        </>
    )
}