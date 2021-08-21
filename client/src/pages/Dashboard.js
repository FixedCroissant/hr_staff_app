import React,{ useState, useEffect } from 'react'; 
import Sidebar from '../components/Sidebar';
import BackendBasePage from '../layout/BackendBasePage';
import FooterBasePage from '../layout/FooterBasePage';


export default function Dashboard(props) 
{
  return (
    <div>
          <Sidebar/>
          <BackendBasePage/> 
          <FooterBasePage/>
    </div>
  )
}