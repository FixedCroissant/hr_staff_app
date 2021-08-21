import React,{ useState, useEffect } from 'react';
import { useHistory,useLocation } from "react-router-dom";
import { makeStyles,useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import axios from 'axios';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import PeopleIcon from '@material-ui/icons/People';
import Divider from '@material-ui/core/Divider';


import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';



import HomeIcon from '@material-ui/icons/Home';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';

import Logout from '../components/Logout';



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  ncsubutton:{
      background:'#990000',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  ncsuBack:{
    background: '#990000',
  },
  title: {
    flexGrow: 1,
  },
  paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
  },
  nested: {
       paddingLeft: theme.spacing(4),
    },
    
}));




export default function Sidebar() 
{

  
  
  // Declare a new state variable, which we'll call "isLoggedI"
  //Get information from our history stack in the router.
  let isLoggedIn = useLocation();
  
 

  //Get History.
  let history = useHistory();

  
  
  //Update our login.
  const [login, setLogin] = useState(null);
  const [open,setOpen] = React.useState(false);

  const [dropdownMenuToggle, setHidden] = useState(false) //start with false to start out.
  const handleClick = () => setHidden(!dropdownMenuToggle) // complete a toggle of the value above.

  
  const classes = useStyles();
  const theme = useTheme();


  const handleDrawerOpen =  ()=>{
    setOpen(true);
  }
  const handleDrawerClose = ()=>{
    setOpen(false);
  }

  /*Go to the user list. */
  const handleUserClick=()=>{
          //Go to the user list page.
           history.push({
            pathname: '/users',
            state: {isLoggedIn:isLoggedIn},
          });
  }

  /*Go to the role list page*/
  const handleRoleClick=()=>{
          //Go to the role list page.
          history.push({pathname:"/roles",state:{isLoggedIn:isLoggedIn}});
  }

  /*Go to dashboard.*/
  const handleAdminClick = ()=>{
          history.push({pathname:"/dashboard",state:{isLoggedIn:isLoggedIn}});
  }

  /*HR Requests*/
  //Create new request.
  const handleHRCreateClick = () =>{
        history.push({pathname:"/hr/create",state:{isLoggedIn:isLoggedIn}});
  }

  /**
   * See All HR Requests
   * 
   */

   const handleHRSeeAllClick=()=>{
        history.push({pathname:"/hr/index",state:{isLoggedIn:isLoggedIn}});
   }




  const handleLogout2 = (data)=>{
    axios.get(process.env.REACT_APP_API_URL+`/api/logout`)
      .then(response=>{
          //console.log(response.data.loggedIn)
          if (response.data.isLoggedIn){console.log("person is still logged in.")}
          else {
              //Need to redirect, the cookie should be removed from Express Already.
              history.push("/");
      }})
  }

  //Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //Check our state from our router.
    console.log(isLoggedIn);
    //as long as its not undefined.
    if(isLoggedIn.state !==undefined){
      setLogin(isLoggedIn.state.isLoggedIn);
    }
    
  }, []);

//Get our menu button  
 const MenuButton = ()=>{
   if(login){
       return  <IconButton edge="start" onClick={handleDrawerOpen}  className={classes.menuButton} color="inherit" aria-label="menu">
       <MenuIcon />
     </IconButton>;
   }
   return null;
 
 };



  return (


    
            <div className={classes.paper}>  
                            <AppBar position="static">
                                              <Toolbar className={classes.ncsuBack}>
                                              <MenuButton checkLogin={login}/>
                                                        <Typography variant="h6" className={classes.title}>
                                                                HR FUN STUFF.
                                                        </Typography>
                                                        <Logout checkLogin={login} handleLogout={()=>handleLogout2()}/>                                                               
                                              </Toolbar>
                            </AppBar>
                              <Drawer
                                className={classes.drawer}
                                variant="persistent"
                                anchor="left"
                                open={open}
                                classes={{paper: classes.drawerPaper}}
                              >
                             <div className={classes.drawerHeader}>
                                  <IconButton onClick={handleDrawerClose}>
                                                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                  </IconButton>
                            </div>
                          <Divider />
                              <List>
                                  <ListItem button onClick={(e) => {handleAdminClick(e)}}> 
                                        <ListItemIcon>
                                          <HomeIcon/>
                                        </ListItemIcon>
                                    <ListItemText primary="Admin"></ListItemText> 
                                  </ListItem>
                                  
                                  <ListItem button onClick={(e) => {handleUserClick(e)}}> 
                                        <ListItemIcon>
                                              <PeopleIcon />
                                        </ListItemIcon>
                                    <ListItemText primary="Users"></ListItemText> 
                                  </ListItem>
                                  
                                  <ListItem button onClick={(e)=>handleRoleClick(e)}> 
                                    <ListItemIcon>
                                      <AssignmentIndIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Roles"></ListItemText> 
                                  </ListItem>

                                  <ListItem button>
                                    <ListItemIcon>
                                      <AssignmentIcon/>  
                                    </ListItemIcon> 
                                    <ListItemText primary="Revisions"></ListItemText> 
                                  </ListItem>
 



                                  <ListItem button onClick={handleClick}>
                                    <ListItemIcon>
                                      <AssignmentIcon/>  
                                    </ListItemIcon> 
                                    <ListItemText primary="HR Requests"></ListItemText> 
                                    {dropdownMenuToggle ? <ExpandLess /> : <ExpandMore />}
                                  </ListItem>


                                  {/* COLLAPSEABLE AREA */}
                                  <Collapse in={dropdownMenuToggle} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                              <ListItem button className={classes.nested}   onClick={(e) => {handleHRCreateClick(e)}}>
                                                <ListItemText primary="Create New Request"/>
                                              </ListItem>
                                              <ListItem button className={classes.nested} onClick={(e) => {handleHRSeeAllClick(e)}}>
                                                <ListItemText primary="See Requests"/>
                                              </ListItem>
                                            </List>
                                      </Collapse>
                              </List>
                              <div className={classes.drawerHeader} />
                              <Typography paragraph>
                                  
                              </Typography>
                            </Drawer>
                            
            </div>   
    )
}