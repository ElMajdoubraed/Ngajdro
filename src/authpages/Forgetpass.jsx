import React, { useRef, useState } from "react"
import { Container,Card } from "react-bootstrap"
import Alert from '@mui/material/Alert';
import { useAuth } from "../authContexts/AuthContext"
import { Link } from "react-router-dom"
import AlertTitle from '@mui/material/AlertTitle';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.min.css';

export default function Forget() {
  document.title="Haya ngajdro - Reset Password"
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")
  const [title , setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const { resetPassword } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setType("")
      setTitle("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
      setTitle("Success")
      setType("success")
    } catch {
      setTitle("Error")
      setType("error")
      setMessage("Failed to reset password")
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
          <h1 className="text-center mb-3 label">Reset Password</h1>
          {message && <Alert className="mb-3 mt-3" severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {message} — <strong>check it out!</strong>
      </Alert>}
          <form onSubmit={handleSubmit}>
          <input id="email" ref={emailRef} name="email" className="input is-rounded mb-3" type="email" placeholder="Email" required></input>
          <button type="submit" disabled={loading} className="button is-link is-rounded w-100 mb-3">Reset Password</button>
          <Link to="/login"><button type="submit"  className="button is-link is-light is-rounded w-100 mb-3">Login</button></Link>
          </form>
          </Card.Body>
          </Card>
         
              </div>
</Container>
</>)
}