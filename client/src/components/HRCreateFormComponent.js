import React, { Component } from 'react';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const HRCreateFormComponent = (props) => (

        <div className="">
        <Formik
        //initialValues={{hrpartnername:'',hrrequestorfirstname:'',hrrequestorlastname:''}}
        initialValues={props.myRequest}
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

        //Good for debugging information.
        /*onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}*/

        onSubmit={(values)=>{console.log(values)}}

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
            
            {/* <label>HR Partner Name:</label>
            <input type="text" name="hrpartnername" onChange={handleChange} onBlur={handleBlur} value={values.hrpartnername}/>
            {errors.hrpartnername && touched.hrpartnername && errors.hrpartnername} */}

                            <TextField
                                        id="standard-full-width"
                                        label="HR Partner Name"
                                        style={{ margin: 8 }}
                                        placeholder="Placeholder"                                       
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
                                        placeholder="Placeholder"                                       
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
                                        placeholder="Placeholder"                                       
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
    
  );
  
  export default HRCreateFormComponent;