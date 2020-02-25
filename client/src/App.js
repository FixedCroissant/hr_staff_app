import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ListPage from './pages/ListPage'
import UserPage from './pages/UserPage';
import  UserDetailPage from './pages/UserDetailPage';
import HRRequestPage from './pages/HRRequestPage';
import HRListPage from './pages/HRListPage';
import NotFoundPage from './pages/NotFoundPage';


import Dashboard from './pages/Dashboard';
import history from './history';



export default function App() {
 
  
    
  return (


  <div>
              <Switch  history={history}>      
              <Route exact path="/" component={HomePage} />
              <Route path="/list" component={ListPage} />

                    {/* Protected Routes */}
                            <Route path="/dashboard"  component={Dashboard} />
                            <Route path="/users" component={UserPage} />
                            <Route path="/user/:id" component={UserDetailPage} />
                            <Route path="/hr/create" component={HRRequestPage} />
                            <Route path="/hr/index" component={HRListPage} />
                            <Route path="" component={NotFoundPage} />
                        
            </Switch>
 </div>
  )
}