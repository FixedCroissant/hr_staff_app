import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Sidebar from "../components/Sidebar";

import { Container, Row, Col } from "react-grid-system";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";


import FooterBasePage from '../layout/FooterBasePage';

//Needed for date picker.
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
//Date picker.
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { Formik } from "formik";
//Validation
import * as Yup from "yup";

const useStyles  = theme => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  requiredItem:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 1,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 100,
    padding: '0 30px',
  }
});

//Validation Schema...
const myValidationSchema = Yup.object().shape({
  hrpartnername: Yup.string()
    .required("HR Partner Name is required!"),
  hrrequestorfirstname: Yup.string().required("First Name is Required"),
  hrrequestorlastname: Yup.string().required("Last Name is Required"),
  cabinetmember: Yup.string().required("Cabinet Member is Required"),
  requestingdepartment: Yup.string().required("Department is Required")
});

class HRRequestPage extends Component {
  //Initialize the state
  constructor(props) {
    super(props);

this.state = {
      newRequest: {
        hrpartnername: "",
        hrrequestorfirstname: "",
        hrrequestorlastname: "",
        cabinetmember: "",
        requestingdepartment: "",
        effectivedate: new Date('2020-01-19'),
        employeefirstname: "",
        employeelastname: "",
        formeremployeefn: "",
        formeremployeeln: "",
        category: "",
        fsla: "",
        requesttype: "",
        purpose: "",
        justification: ""
      }
    };
  }

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Sidebar props={this.props} />
        <Formik
          initialValues={this.state.newRequest}
          validationSchema={myValidationSchema}
          //Handle submission
          onSubmit={values => {
            console.log(
              "You are updating the following information to the server:"
            );
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
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              {/* USE CONTAINER SYSTEM */}

              <Container>
                
                <Row>
                    <Col sm={4} md={12} offset={{md:1}}>
                      <p>
                        Please provide the following information to create a new staff request. All fields are required.
                      </p>
                    </Col>
                </Row>
                
                <Row>
                  <Col sm={4} md={12} offset={{ md: 1 }}>
                    <TextField
                      id="standard-full-width"
                      label="HR Partner Name"
                      style={{ margin: 8 }}
                      error={errors.hrpartnername && touched.hrpartnername}
                      helperText={(errors.hrpartnername && touched.hrpartnername) && errors.hrpartnername}
                      placeholder="Dept."
                      margin="normal"
                      name="hrpartnername"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.hrpartnername}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <TextField
                      id="standard-full-width"
                      label="Requestor First Name"
                      style={{ margin: 8 }}
                      error={errors.hrrequestorfirstname && touched.hrrequestorfirstname}
                      helperText={(errors.hrrequestorfirstname && touched.hrrequestorfirstname) && errors.hrrequestorfirstname}
                      placeholder="Mr."
                      margin="normal"
                      name="hrrequestorfirstname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.hrrequestorfirstname}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <TextField
                      id="standard-full-width"
                      label="Requestor Last Name"
                      style={{ margin: 8 }}
                      error={errors.hrrequestorlastname && touched.hrrequestorlastname}
                      helperText={(errors.hrrequestorlastname && touched.hrrequestorlastname) && errors.hrrequestorlastname}
                      placeholder="Wuf"
                      margin="normal"
                      name="hrrequestorlastname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.hrrequestorlastname}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={12} offset={{ md: 1 }}>
                    <TextField
                      id="standard-full-width"
                      label="Cabinet Member"
                      error={errors.cabinetmember && touched.cabinetmember}
                      helperText={(errors.cabinetmember && touched.cabinetmember) && errors.cabinetmember}
                      placeholder="Cabinet Member"
                      style={{ margin: 8 }}
                      margin="normal"
                      name="cabinetmember"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cabinetmember}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <TextField
                      id="standard-full-width"
                      label="Requesting Department"
                      error={errors.requestingdepartment && touched.requestingdepartment}
                      helperText={(errors.requestingdepartment && touched.requestingdepartment) && errors.requestingdepartment}
                      placeholder="Request Dept."
                      style={{ margin: 8 }}
                      margin="normal"
                      name="requestingdepartment"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.requestingdepartment}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        style={{ margin: 8 }}
                        label="Effective Date:"
                        format="MM/dd/yyyy"
                        value={values.effectivedate}
                        onChange={(date, dateString) =>
                          setFieldValue("effectivedate", dateString)
                        }
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4} md={12} offset={{ md: 1 }}>
                    <h4>Employee Information </h4>
                    <TextField
                      id="standard-full-width"
                      label="Employee First Name:"
                      style={{ margin: 8 }}
                      margin="normal"
                      name="employeefirstname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.employeefirstname}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    <TextField
                      id="standard-full-width"
                      label="Employee Last Name:"
                      style={{ margin: 8 }}
                      margin="normal"
                      name="employeelastname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.employeelastname}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col sm={4} md={12} offset={{ md: 1 }}>
                    <h4>Former Employee Information </h4>
                    {/* Former Employee */}
                    <TextField
                      id="standard-full-width"
                      label="First Name:"
                      style={{ margin: 8 }}
                      margin="normal"
                      name="formeremployeefn"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.formeremployeefn}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    {/* Former Employee */}
                    <TextField
                      id="standard-full-width"
                      label="Last Name:"
                      style={{ margin: 8 }}
                      margin="normal"
                      name="formeremployeeln"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.formeremployeeln}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <TextField
                      id="standard-full-width"
                      label="Category:"
                      style={{ margin: 8 }}
                      margin="normal"
                      name="category"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.category}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col sm={4} md={12} offset={{ md: 1 }}>
                    <h4>Additional Details</h4>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">FSLA</FormLabel>
                      <RadioGroup
                        aria-label="fsla"
                        name="fsla"
                        value={values.fsla}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>

                    <TextField
                      id="standard-full-width"
                      label="Type:"
                      style={{ margin: 8 }}
                      margin="normal"
                      name="requesttype"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.requesttype}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <TextField
                      id="standard-full-width"
                      label="Purpose:"
                      style={{ margin: 8 }}
                      margin="normal"
                      name="purpose"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.purpose}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />

                    <TextField
                      id="standard-full-width"
                      label="Employee Justification:"
                      style={{ margin: 8 }}
                      multiline
                      margin="normal"
                      name="justification"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.justification}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col sm={4} md={3} offset={{ md: 1 }}>
                    <Button type="submit">Submit</Button>
                  </Col>
                  <Col sm={4} md={3}>
                      <Button>Reset</Button>
                  </Col>
                </Row>
              </Container>
            </form>
          )}
        </Formik>

        <FooterBasePage/>
      </div>
    );
  }
}

export default withStyles(useStyles)(HRRequestPage)
