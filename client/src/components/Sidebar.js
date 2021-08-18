import React,{ useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
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




export default function Sidebar(props) 
{
  
  // Declare a new state variable, which we'll call "isLoggedI"
  //const isLoggedIn = useState("true");
  
  //Update our count.
  //const [loggedIn, setCount] = useState(0);

  const [open,setOpen] = React.useState(false);

  const [dropdownMenuToggle, setHidden] = useState(false) //start with false to start out.
  const handleClick = () => setHidden(!dropdownMenuToggle) // complete a toggle of the value above.

  let handleLogout;

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
          //routeProps.myProps.props.history.push("/users");
           props.props.history.push("/users");
  }

  /*Go to the role list page*/
  const handleRoleClick=()=>{
          //Go to the role list page.
          props.props.history.push("/roles");
  }

  /*Go to dashboard.*/
  const handleAdminClick = ()=>{
          props.props.history.push("/dashboard");
  }

  /*HR Requests*/
  //Create new request.
  const handleHRCreateClick = () =>{
        props.props.history.push("/hr/create");
  }

  /**
   * See All HR Requests
   * 
   */

   const handleHRSeeAllClick=()=>{
        props.props.history.push("/hr/index");
   }




  const handleLogout2 = (data)=>{
    axios.get(process.env.REACT_APP_API_URL+`/api/logout`)
      .then(response=>{
          //console.log(response.data.loggedIn)
          if (response.data.isLoggedIn){console.log("person is still logged in.")}
          else {
            console.log("we need to log this person out.")
              //Need to redirect, the cookie should be removed from Express Already.
              props.props.history.push("/");
            }
      })
  }

  //Similar to componentDidMount and componentDidUpdate:
  useEffect(() => { 

    
// Pass in a callback function!
const handleLogout = ()=>{
          
        //console.log(props.props.location.state.isLoggedIn);
        //TODO FIX THIS.
         console.log(props.props.history.location.state.isLoggedIn);

        //Logout
       //Adjust logged in flag.
       //this.setState({isLoggedIn:false});

        axios.get(process.env.REACT_APP_API_URL+'/api/logout');        
    }
    
    
   


  }, []);

  return (


    
            <div className={classes.paper}>    
                            <AppBar position="static">
                                              <Toolbar className={classes.ncsuBack}>
                                                        <IconButton edge="start" onClick={handleDrawerOpen}  className={classes.menuButton} color="inherit" aria-label="menu">
                                                            <MenuIcon />
                                                        </IconButton>
                                                        <Typography variant="h6" className={classes.title}>
                                                                HR FUN STUFF.
                                                        </Typography>
                                                        <Button className={classes.button} variant="contained" onClick={() => handleLogout2()}>
                                                          Logout
                                                        </Button>                                                            
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