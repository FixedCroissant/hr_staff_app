import React,{ useState, useEffect } from 'react';  
import Sidebar from '../components/Sidebar';
import BackendBasePage from '../layout/BackendBasePage';
import FooterBasePage from '../layout/FooterBasePage';


export default function Dashboard(props) 
{
  
  /*const routeProps = {
    myProps: props,
    match: props.match,
    history: props.history,
    location: props.location
  };*/

  return (
    <div>
          <Sidebar props={props}/>
          <BackendBasePage/> 
          <FooterBasePage/>
    </div>
  )
}