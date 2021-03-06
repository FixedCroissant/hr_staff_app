import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import Button from "@material-ui/core/Button";

//Not using yet.
//import HRCreateFormComponent from '../components/HRCreateFormComponent';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import FooterBasePage from '../layout/FooterBasePage';


class RegisterPage extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {        
      newRequest: {firstname:'',lastname:'',email:'',password:''}      
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    
  }

  render() {
    

    return (
      <div>
                <h3>Please Register for an Account</h3>
                <p>
                    Please provide your email address to create an account.
                </p>

                {/* START */}
                <div className="">
        <Formik
        initialValues={this.state.newRequest}
        validate={values => {
            //Set Errors and requirements.
          const errors = {};
         
          //Show required values.
          if(!values.email){
              errors.email='Required';
          }        
          return errors;
        }}

        //Handle submission
        onSubmit={(values)=>{     
            console.log("You are currently sending the following values to the serverYAY:");       
            console.log(values); 

            //Upload information to our server:
            fetch(process.env.REACT_APP_API_URL + `/api/register`,
                    {
                    method:'POST',
                    headers: {
                                'Content-Type': 'application/json'                
                    },
                    body:JSON.stringify(values)
                })
                .then(res=>console.log(res));
                
        }}

        //Handle changes.
        handleChange={(values)=>{

            //lets set my values as things change.
            this.setState(
                {
                newRequest: {
                            firstname: values.firstname,
                            lastname:values.lastname,
                            emailaddress:         values.email,
                            password:  values.password, 
                         }      
                });
            //Do something with the values.
            console.log(values)
        }}

      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>

                            
                            {/* FIRST NAME */}
                            <TextField 
                                id="standard-full-width"
                                label="First Name:"
                                style={{margin: 8}}
                                margin="normal"
                                name="firstname"
                                onChange={handleChange}
                                value={values.firstname}
                                InputLabelProps={{shrink:true}}
                            />

                            {/* LAST NAME */}
                            <TextField 
                                id="standard-full-width"
                                label="Last Name:"
                                style={{margin:8}}
                                margin="normal"
                                name="lastname"
                                onChange={handleChange}
                                value={values.lastname}
                                InputLabelProps={{shrink:true}}
                            />

                            <br/>
                            <br/>


                            {/* EMAIL ADDRESS */}
                            <TextField
                                        id="standard-full-width"
                                        label="EMail Address:"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        name="email"
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                        value={values.email}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                            />
                            
                            {errors.email && touched.email && errors.email} 

                            <br/>


                            {/* PASSWORD                 */}
                            <TextField
                                        id="standard-full-width"
                                        label="Password:"
                                        style={{ margin: 8 }}                                       
                                        margin="normal"
                                        name="password"
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                        value={values.password}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                            />
                            {errors.password && touched.password && errors.password} 

                               
                            <br/>                
                            <br/>                
                            <br/>                
                            <Button type="submit">Register for Account</Button>
          </form>
        )}
      </Formik>
    </div>


                {/* END */}


                <FooterBasePage/>
      </div>
    );
  }
}

export default RegisterPage;