import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import UserDetailPage from "./pages/UserDetailPage";
import HRRequestPage from "./pages/HRRequestPage";
import HRListPage from "./pages/HRListPage";
import HRDetailPage from "./pages/HRDetailPage";
import UnAuthPage from './pages/unAuthorized';
import NotFoundPage from "./pages/NotFoundPage";

import Dashboard from "./pages/Dashboard";
import history from "./history";


//Get my AuthenticatedRouter Wrapper function
import AuthenticatedRoute from "./AuthenticatedRoute";



export default function App() {



  return (
    
            <div>
                    <Switch  history={history}>      
              <Route exact path="/" component={HomePage} />           

                    {/* Protected Routes */} 
                    <AuthenticatedRoute path="/dashboard" component={Dashboard}/>  
                            <Route path="/users" component={UserPage} />
                            <Route path="/user/:id" component={UserDetailPage} />
                            <Route path="/hr/create" component={HRRequestPage} />
                            <Route path="/hr/index" component={HRListPage} />
                            <Route path="/hr/:id" component={HRDetailPage} />
                    {/*END PROTECTED ROUTES*/}        
                            <Route path="/unauth" component={UnAuthPage}/>        
                            <Route path="" component={NotFoundPage} />
                        
</Switch>
</div>
           
  );
}
