import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import UserDetailPage from "./pages/UserDetailPage";
import RoleListPage from "./pages/RoleListPage";
import HRRequestPage from "./pages/HRRequestPage";
import HRListPage from "./pages/HRListPage";
import HRDetailPage from "./pages/HRDetailPage";
import UnAuthPage from './pages/unAuthorized';
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";

import Dashboard from "./pages/Dashboard";
import history from "./history";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//Get my AuthenticatedRouter Wrapper function
import AuthenticatedRoute from "./AuthenticatedRoute";



export default function App() {



  return (
    
            <div>
                <ToastContainer />
                    <Switch  history={history}>      
              <Route exact path="/" component={HomePage} /> 
              <Route path="/register" component={RegisterPage}/>          

                    {/* Protected Routes */} 
                            <AuthenticatedRoute path="/dashboard" component={Dashboard} />
                            <AuthenticatedRoute path="/users" component={UserPage} />
                            <AuthenticatedRoute path="/user/:id" component={UserDetailPage} />
                            <AuthenticatedRoute path="/hr/create" component={HRRequestPage} />
                            <AuthenticatedRoute path="/hr/index" component={HRListPage} />
                            <AuthenticatedRoute path="/hr/:id" component={HRDetailPage} />
                            <Route path="/roles" component={RoleListPage} />

                    {/*END PROTECTED ROUTES*/}        
                            <Route path="/unauth" component={UnAuthPage}/>        
                            <Route path="" component={NotFoundPage} />
                        
</Switch>
</div>
           
  );
}
