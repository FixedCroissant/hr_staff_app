import React,{ useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';


const useStyles = makeStyles(theme => ({

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
}));


export default function Dashboard() 
{
  
  // Declare a new state variable, which we'll call "isLoggedI"
  const isLoggedIn = useState("true");
  
  const classes = useStyles();

  //const handleClick = (data)=>{axios.get('http://localhost:9000/api/logout',data)}

  return (

            <div className={classes.paper}>
                            <AppBar position="static">
                                              <Toolbar className={classes.ncsuBack}>
                                                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                                            <MenuIcon />
                                                        </IconButton>
                                                        <Typography variant="h6" className={classes.title}>
                                                                Dashboard
                                                        </Typography>
                                                        <Button  color="inherit">Logout</Button>
                                              </Toolbar>
                            </AppBar>
              
            </div>
    
    )
}