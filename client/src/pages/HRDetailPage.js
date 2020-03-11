import React, { Component } from "react";
import "../App.css";
import Sidebar from "../components/Sidebar";
import { Formik } from "formik";
import { TextField } from "@material-ui/core";
import FooterBasePage from "../layout/FooterBasePage";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";


class HRDetailPage extends Component {
  // Initialize the state
  constructor(props) {
    super(props);

    this.state = {
      hrID: this.props.match.params.id,
      hrItem: []
    };
  }

  // Fetch the list on first mount
  componentWillMount() {
    this.getHRList();
  }

  // Retrieves the list of items from the Express app
  getHRList = () => {
    fetch("http://localhost:9000/api/hr/" + this.state.hrID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(hrItem => this.setState({ hrItem }));
  };

  render() {
    return (
      <div>
        <Sidebar props={this.props} />
        <h4>Specific HR Request: </h4>

        <div className="">
          <Formik
            //initialValues = {initialFormValue}
            initialValues={{
              id: this.state.hrItem.id,
              requesting_department: this.state.hrItem.requesting_department,
              requestor_firstname: this.state.hrItem.requestor_firstname,
              requestor_lastname: this.state.hrItem.requestor_lastname
            }}
            enableReinitialize={true}
            //initialValues = {{myItems:this.state.hrItem}}
            validate={values => {
              //Set Errors and requirements.
              const errors = {};

              if (!values.requesting_department) {
                errors.requesting_department = "Required";
              }
              return errors;
            }}
            onChange={values => {
              console.log(values);
            }}
            //Handle submission
            onSubmit={values => {
              alert("Youre submitting something to the server.");
              //console.log("You are updating the following information to the server:");
              //console.log(values);
              //Upload information to our server:
              fetch("http://localhost:9000/api/hr/" + values.id, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
              })
                .then(res => res.json())
                //Get my message data.
                .then(data => {
                  //Put this in a nice little place.
                  //alert(data.message)
                  //console.log(data)
                  toast(data.message);
                })

                .catch(error => {
                  console.error("Error:", error);
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              isSubmitting
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  id="standard-full-width"
                  label="HR Partner Name"
                  style={{ margin: 8 }}
                  placeholder="Department"
                  margin="normal"
                  name="requesting_department"
                  onChange={handleChange}
                  value={values.requesting_department || ""}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <br />
                <TextField
                  id="standard-full-width"
                  label="Requestor First Name"
                  style={{ margin: 8 }}
                  placeholder="First Name"
                  margin="normal"
                  name="requestor_firstname"
                  onChange={handleChange}
                  value={values.requestor_firstname || ""}
                  InputLabelProps={{
                    shrink: true
                  }}
                />

                <TextField
                  id="standard-full-width"
                  label="Requestor Last Name"
                  style={{ margin: 8 }}
                  placeholder="Last Name"
                  margin="normal"
                  name="requestor_lastname"
                  onChange={handleChange}
                  value={values.requestor_lastname || ""}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <br />
                <br />
                <br />

                <Button variant="contained" color="primary" type="submit">
                  Update Record
                </Button>
              </form>
            )}
          </Formik>
        </div>
        <FooterBasePage />
      </div>
    );
  }
}

export default HRDetailPage;
