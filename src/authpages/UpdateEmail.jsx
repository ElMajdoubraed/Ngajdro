import React, { useRef, useState } from "react"
import { Container,Card } from "react-bootstrap"
import Alert from '@mui/material/Alert';
import { useAuth } from "../authContexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import AlertTitle from '@mui/material/AlertTitle';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.min.css';
import PrimarySearchAppBar from '../components/Navbar'
export default function UpdateEmail() {
  document.title="Haya ngajdro - Update Email"
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")
  const [title , setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const { updateEmail,currentUser } = useAuth()
  const history = useHistory()
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setType("")
      setTitle("")
      setLoading(true)
      if (emailRef.current.value !== currentUser.email) {
       await updateEmail(emailRef.current.value)
       setMessage("Check your inbox for further instructions")
      setTitle("Success")
      setType("success")
      setTimeout(() => {  history.push("/profile") }, 3000);
      
      }else{
        setTitle("Error")
        setType("error")
        setMessage("You can't set the some email")
        setLoading(false)
      }
      
    } catch(fireBaseError)  {
        const stop = parseInt(fireBaseError.message.indexOf(".")+1);
      setTitle("Error")
      setType("error")
      setMessage(fireBaseError.message.slice(9,stop))
      setLoading(false)
    }

    
  }
  return(
<>
<PrimarySearchAppBar/>
<Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
              <div className="w-100" style={{ maxWidth: "400px"}}>
              
              <Card>
        <Card.Body>
          <h1 className="text-center mb-3 label">Update Email</h1>
          {message && <Alert className="mb-3 mt-3" severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {message} — <strong>check it out!</strong>
      </Alert>}
          <form onSubmit={handleSubmit}>
          <input id="email" ref={emailRef} name="email" className="input is-rounded mb-3" type="email" placeholder="New Email" required></input>
          <button type="submit" disabled={loading} className="button is-link is-rounded w-100 mb-3">Update Email</button>
          <Link to="/profile"><button type="submit"  className="button is-link is-light is-rounded w-100 mb-3">Profile</button></Link>
          </form>
          </Card.Body>
          </Card>
         
              </div>
</Container>
</>)
}