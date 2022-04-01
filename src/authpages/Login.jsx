import React, { useRef, useState } from "react"
import { Container,Card } from "react-bootstrap"
import Alert from '@mui/material/Alert';
import { useAuth } from "../authContexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import AlertTitle from '@mui/material/AlertTitle';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.min.css';


export default function Login() {
  document.title="Haya ngajdro - Login"
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const history = useHistory()
  const { login } = useAuth()
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
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
          <h1 className="text-center mb-3 label">Login</h1>
          {error && <Alert className="mb-3 mt-3" severity="error">
        <AlertTitle>Error</AlertTitle>
        {error} — <strong>check it out!</strong>
      </Alert>}
          <form onSubmit={handleSubmit}>
          <input id="email" name="email" ref={emailRef} className="input is-rounded mb-3" type="email" placeholder="Email" required></input>
          <input id="password" name="password" ref={passwordRef} className="input is-rounded mb-3" type="password" placeholder="Password" required minLength={8}></input>
          <button type="submit" disabled={loading} className="button is-link is-rounded w-100 mb-3">Login</button>
          <Link to="/forget"><button type="button"  className="button is-link is-light is-rounded w-100 mb-3">Forget Password</button></Link>
          </form>
          <div className="w-100 text-center mt-5">
       <b> Need an account? </b><Link className="is-link" to="/signup">Sign Up</Link>
      </div>
          </Card.Body>
          </Card>
         
              </div>
</Container>
</>)
}