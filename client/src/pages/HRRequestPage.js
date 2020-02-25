import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';

//Not using yet.
//import HRCreateFormComponent from '../components/HRCreateFormComponent';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



import FooterBasePage from '../layout/FooterBasePage';

class HRRequestPage extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    

    this.state = {        
      newRequest: {hrpartnername:'',hrrequestorfirstname:'',hrrequestorlastname:''}      
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    
  }

  render() {
    

    return (
      <div>
                <Sidebar props={this.props} />
                <h3>Create New HR Request</h3>
                <p>
                    {/* Lets see our updated values we want to pass to the form!!: */}
                </p>
                {/* <HRCreateFormComponent onChange = {this.handleChange} myRequest={this.state.newRequest}/> */}

                {/* START */}
                <div className="">
        <Formik
        //initialValues={{hrpartnername:'',hrrequestorfirstname:'',hrrequestorlastname:''}}
        initialValues={this.state.newRequest}
        validate={values => {
            //Set Errors and requirements.
          const errors = {};
         
          if(!values.hrpartnername){
              errors.hrpartnername='Required';
          } 
          if(!values.hrrequestorfirstname || !values.hrrequestorlastname ){
              errors.hrrequestorfirstname='Required';
              errors.hrrequestorlastname='Required';

          }         
          return errors;
        }}

        //Handle submission
        onSubmit={(values)=>{     
            console.log("You are currently sending the following values to the serverYAY:");       
            console.log(values); 

            //Upload information to our server:
            fetch('http://localhost:9000/api/hr/store',
                    {
                    method:'POST',
                    headers: {
                                'Content-Type': 'application/json'                
                    },
                    body:JSON.stringify(values)
                })
                .then(res=>console.log(res));
                //.then(res => res.json());
        }}

        //Handle changes.
        handleChange={(values)=>{

            //lets set my values as things change.
            this.setState(
                {
                newRequest: {
                            hrpartnername:         values.hrpartnername,
                            hrrequestorfirstname:  values.hrrequestorfirstname,
                            hrrequestorlastname:   values.hrrequestorlastname 
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>

                            <TextField
                                        id="standard-full-width"
                                        label="HR Partner Name"
                                        style={{ margin: 8 }}
                                        placeholder="Dept."
                                        margin="normal"
                                        name="hrpartnername"
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                        value={values.hrpartnername}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                            />
                            
                            {errors.hrpartnername && touched.hrpartnername && errors.hrpartnername} 



                            <TextField
                                        id="standard-full-width"
                                        label="Requestor First Name"
                                        style={{ margin: 8 }}
                                        placeholder="Mr."                                       
                                        margin="normal"
                                        name="hrrequestorfirstname"
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                        value={values.hrrequestorfirstname}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                            />
                            {errors.hrrequestorfirstname && touched.hrrequestorfirstname && errors.hrrequestorfirstname} 

                            <TextField
                                        id="standard-full-width"
                                        label="Requestor Last Name"
                                        style={{ margin: 8 }}
                                        placeholder="Wuf"                                       
                                        margin="normal"
                                        name="hrrequestorlastname"
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                        value={values.hrrequestorlastname}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                            />
                            {errors.hrrequestorlastname && touched.hrrequestorlastname && errors.hrrequestorlastname} 
                               

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
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

export default HRRequestPage;