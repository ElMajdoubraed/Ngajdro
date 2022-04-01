import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AuthProvider } from "../authContexts/AuthContext"
import PrivateRoute from "./PrivateRoute"
import Login from "../authpages/Login";
import Signup from "../authpages/Signup";
import Profile from "../pages/Profile"
import Forget from "../authpages/Forgetpass"
import Messages from  "../pages/Messages"
import Home from  "../pages/Home"
import Search from  "../pages/Search"
import Message from  "../pages/ViewMessage"
import UpdateProfile from  "../pages/UpdateProfile"
import UpdateEmail from "../authpages/UpdateEmail";
import UpdatePass from "../authpages/UpdatePassword";
import User from "../pages/User"

function App() {
   window.addEventListener('offline', () => console.log('Became offline'));
window.addEventListener('offline', () => alert('Became offline'));
  return (

     <Router>
        <AuthProvider>
     <Switch>
     <PrivateRoute exact path="/" component={Home} />
     <PrivateRoute exact path="/search/:name" component={Search} />
     <PrivateRoute exact path="/search" component={Search} />
  <Route exact path="/login" component={Login} />
  <Route exact path="/signup" component={Signup} />
  <PrivateRoute exact path="/profile" component={Profile} />
  <PrivateRoute exact path="/updateprofile" component={UpdateProfile} />
  <Route exact path="/forget" component={Forget} />
  <PrivateRoute exact path="/messages" component={Messages} />
  <PrivateRoute exact path="/updatemail" component={UpdateEmail} />
  <PrivateRoute exact path="/updatpass" component={UpdatePass} />
  <PrivateRoute exact path="/message/:id" component={Message} />
  <PrivateRoute exact path="/user/:id" component={User} />
      </Switch>
      </AuthProvider>
     </Router>  
  );
}

export default App;
