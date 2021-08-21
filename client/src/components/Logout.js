import React  from 'react';
import Button from '@material-ui/core/Button';


const logoutButton = (props)=>{
  console.log("log out props");
  console.log(props);
    if(props.checkLogin){
        return <Button variant="contained" onClick={props.handleLogout}>
        Logout
      </Button>;
    }
    return <h1>NOT LOGGED IN.</h1>;
   
}

export default logoutButton;