import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import { Link,useHistory } from "react-router-dom"
import { useAuth } from "../authContexts/AuthContext"
import SearchIcon from '@mui/icons-material/Search';
import {database} from "../firebase";
var nbMessages = 0;
export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory()
  const {logout} = useAuth()
  const { currentUser } = useAuth()
  const isMenuOpen = Boolean(anchorEl);
  
  const table = "user/"+currentUser.displayName
  database.ref(table).on("value",(snapshot)=>{
    try{
      if(snapshot.val()["messageNonLu"] !=="0"){
     nbMessages = snapshot.val()["messageNonLu"]; 
    }   
  }

    catch(err){console.log(err)}
            })
  async function handleLogout() {
    try {
      await logout()
      history.push("/login")
    } catch(err) {console.log(err)}
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);

  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      sx={{ mt: '40px' }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
     <Link to="/profile" > <MenuItem onClick={handleMenuClose}>Profile</MenuItem></Link>
     <Link to="/updatemail" > <MenuItem onClick={handleMenuClose}>Update Email</MenuItem></Link>
     <Link to="/updatpass" > <MenuItem onClick={handleMenuClose}>Update Password</MenuItem></Link>
      <hr  style={{border:"1px solid blue"}}></hr>
      <Link ><MenuItem onClick={handleLogout}>Logout</MenuItem></Link>
    </Menu>
  );

  
  return (
    <Box >
      <AppBar style={{margin:"0"}} className='navbar is-link'>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
               <Link style={{color: "white"}} to="/" >Home</Link>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
             <IconButton
              size="large"
              aria-label="Home"
              color="inherit"
              onClick={() => history.push("/")}
            >
              <HomeIcon/>
            </IconButton>
            
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
          <IconButton
              size="large"
              aria-label="Search"
              color="inherit"
              onClick={() => history.push("/search")}
            >
    
                <SearchIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show new messages"
              color="inherit"
              onClick={() => history.push("/messages")}
            >
              <Badge badgeContent={nbMessages} color="error">
                <EmailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="Account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  );
}
