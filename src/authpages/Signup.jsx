import React, { useRef, useState } from "react"
import { Container,Card } from "react-bootstrap"
import Alert from '@mui/material/Alert';
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../authContexts/AuthContext"
import AlertTitle from '@mui/material/AlertTitle';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.min.css';
import {database} from "../firebase"

var nameExist = false;
export default function Signup() {
  nameExist= false;
  document.title="Haya ngajdro - Signup"
  const [error, setError] = useState("")
  const userNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    const table = "user/"+userNameRef.current.value;
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      database.ref(table).on("value",(snapshot)=>{

            nameExist = true;
      });
      if(!nameExist){
      await signup(emailRef.current.value, passwordRef.current.value).then(authenticate=>{
        return authenticate.user
        .updateProfile({
         displayName: userNameRef.current.value,
        })})

      database.ref(table).set({
        "name" :userNameRef.current.value,
        "email" : emailRef.current.value,
        "birthday" : "",
        "phone" : "",
        "urlPicture":"",
        "messageNonLu" : 0
      })
      database.ref("users").push({
        "name" :userNameRef.current.value
      })
      history.push("/")}
      else{setError("Username already exists")}
    } catch(fireBaseError) {
      const stop = parseInt(fireBaseError.message.indexOf(".")+1);
      setError(fireBaseError.message.slice(9,stop) )
    }

    setLoading(false)
  }


  return(
<>
<Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
              <div className="w-100" style={{ maxWidth: "400px"}}>
              
              <Card>
        <Card.Body>
          <h1 className="text-center mb-3 label">Sign Up</h1>
          {error && <Alert className="mb-3 mt-3" severity="error">
        <AlertTitle>Error</AlertTitle>
        {error} — <strong>check it out!</strong>
      </Alert>}
          <form onSubmit={handleSubmit}>
          <input id="name" name="name" pattern="^[a-zA-Z0-9]+([_]?[a-zA-Z0-9]+)*"  ref={userNameRef} className="input is-rounded mb-3" type="text" placeholder="User Name" minLength={3} required></input>    
          <input id="email" name="email" ref={emailRef} className="input is-rounded mb-3" type="email" placeholder="Email" required></input>
       
         <input id="password" name="password" ref={passwordRef} className="input is-rounded mb-3" type="password" placeholder="Password" required minLength={8}></input>
         <input id="confpassword" name="confpassword" ref={passwordConfirmRef} className="input is-rounded mb-3" type="password" placeholder="Confirm Password" required minLength={8}></input>
          <button type="submit" disabled={loading} className="button is-link is-rounded w-100 mb-3">Sign Up</button>
          </form>
          <div className="w-100 text-center mt-5">
       <b> Already have an account? </b><Link className="is-link" to="/login">Login</Link>
      </div>
          </Card.Body>
          </Card>
         
              </div>
</Container>
</>)
}