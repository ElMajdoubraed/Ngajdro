import React,{useRef,useState} from "react"
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import { useAuth } from "../authContexts/AuthContext"
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory } from "react-router-dom"
import 'bulma/css/bulma.min.css';
import PrimarySearchAppBar from '../components/Navbar'
import Avatar from '@mui/material/Avatar';
import "./css/pages.css"
import {database} from "../firebase";

export default function UpdateProfile() {
    const { currentUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    document.title="Haya ngajdro - Profile "
    const history = useHistory()
    const birthdayRef = useRef()
    const phoneRef = useRef()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const table = "user/"+currentUser.displayName;
  async function verifyEmailAd(){
    try{
      setLoading(true)
    currentUser.sendEmailVerification();
    setMessage("Check your inbox for further instructions")    
    }catch(fireBaseError){
      const stop = parseInt(fireBaseError.message.indexOf(".")+1);
      setError(fireBaseError.message.slice(9,stop) )
      setLoading(false)
    }
  }
 function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading2(true)
      const state = {
        "name" : currentUser.displayName,
        "email" :currentUser.email,
        "birthday" : birthdayRef.current.value,
        "phone" : phoneRef.current.value,
      }
      database.ref(table).set(state,(err)=> {
        if(err){
    setError(err)
        }else{
          setMessage("Profile Updated successfully")
          setTimeout(() => {  history.push("/profile") }, 3000);
        }
    });
    } catch(fireBaseError) {
      setLoading2(false)
      setError("Error Of Connexion , Try again")
    }

    setLoading2(false)
  }
    return(
        <>
            <PrimarySearchAppBar / >
            <div style={{
                backgroundcolor:"#6b6464 !important",
                marginTop:"100px"
            }} className="container">
                {error && <Alert className="mb-3 mt-3" severity="error">
        <AlertTitle>Error</AlertTitle>
        {error} — <strong>check it out!</strong>
      </Alert>}
          {message && <Alert className="mb-3 mt-3" severity="success">
        <AlertTitle>Success</AlertTitle>
        {message} — <strong>check it out!</strong>
      </Alert>}
                <div className="divcenter">
           <Avatar  src={currentUser.photoURL}  sx={{ width: 100, height:100 }}/> 
           
</div>
<form onSubmit={handleSubmit}>
<hr style={{border:"0px "}}></hr>
<div className="divcenter">
</div>
<hr style={{border:"1px solid blue"}}></hr>
<div className="row">
{currentUser.emailVerified ? <h1 className="col-6 nameUser">Email : {currentUser.email} <span className="tag is-primary">Verified</span></h1> : 
<h1 className="col-xl-6 mb-3 nameUser">Email : {currentUser.email} <span className="tag is-danger">Not Verified</span></h1>}

<div className="col-xl-6 d-grid gap-2 justify-content-md-end">
{currentUser.emailVerified ? <> </> : <button disabled={loading} onClick={verifyEmailAd} className="button is-primary me-md-2 mb-3" type="button">Send Email Verification</button>} 
</div>
</div>
<hr style={{border:"1px solid blue"}}></hr>
<input id="phone" name="phone" ref={phoneRef}  className="input is-rounded mb-3" type="number" placeholder="Phone Number" minLength={4} required></input>
<input id="birthday" name="birthday" ref={birthdayRef} className="input is-rounded mb-3" type="date" placeholder="Birthday" minLength={4} required></input>
<button type="submit" disabled={loading2} className="button is-link is-rounded w-100 mb-3">Update Profile</button>
</form>
            </div>
        </>
    )
}