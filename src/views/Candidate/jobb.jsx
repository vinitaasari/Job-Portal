/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { getUser } from 'api';
import avatar from "assets/img/profile.png";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import { Pencil } from 'react-bootstrap-icons';
import AvatarPicker from "material-ui-avatar-picker";
import axios from 'axios'
import auth from 'auth-helper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Typography } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { Container, Form, Row, Col, FormGroup, Label, Input, FormText } from 'reactstrap';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      image: avatar,
      mobile: "",
      company_address: "",
      company_name: "",
      contact_person: "",
      designation: ""
    };
  }

  handleChange(event) {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    if (name == "active") {
      this.setState({ [event.target.name]: event.target.checked });
    }
    else {
      this.setState({ [name]: value });
    }
  }
  componentDidMount() {
    // const { match: { params } } = this.props;
    // getUser(params.id, { t: auth.isAuthenticated().token }).then((data) => {
    //   if (data.success == false) {
    //   } else {
    //     console.log(data.data);
    //     if (data.data) {
    //       if (!data.data.image) {
    //         data.data.image = avatar
    //       }
    //       this.setState(data.data);
    //       console.log(this.state);
    //     }
    //   }
    // })
  }
  edit_img() {
    this.refs.fileUploader.click();
  }
  async onFileChange(event) {
    var formData = new FormData;
    formData.append("image", event.target.files[0]);
    axios({
      url: 'http://139.59.74.117/api/image',
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + auth.isAuthenticated().token },
      data: formData
    })
      .then(response => {
        console.log(response)
        this.setState({
          image: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  async handleSubmit(event) {
    event.preventDefault();
    

    if (!/^\d{10}$/.test(this.state.mobile) || this.state.mobile.length>10) {
      this.props.enqueueSnackbar(<h6>Enter Valid Mobile Number</h6>, { variant: 'error', });
    }
    else {
      console.log(this.state.mobile);
      event.preventDefault();
      const { match: { params } } = this.props;

      const formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("mobile", this.state.mobile);

      formData.append("user_id", this.state.user_id);
      // formData.append("mobile", "1234");

      formData.append("image", this.state.image);

      formData.append("company_address", this.state.company_address);
      formData.append("company_name", this.state.company_name);
      formData.append("contact_person", this.state.contact_person);
      formData.append("designation", this.state.designation);
      formData.append("active", this.state.active);
      console.log(this.state.active + "my state");
      formData.append("id", params.id)
      console.log(formData)

      try {
        await axios({
          method: 'post',
          url: 'http://139.59.74.117/api/user/profile',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + auth.isAuthenticated().token
          }
        })
        // getUser(params.id, { t: auth.isAuthenticated().token }).then((data) => {
        //   if (data.success == false) {
        //     this.props.enqueueSnackbar(<h6>Something went wrong</h6>, { variant: 'error', });
        //   } else {
        //     var user = data.data;
        //     if (!data.data.image) {
        //       data.data.image = avatar
        //     }
        //     this.setState(data.data);
        //   }
        // })
        this.props.enqueueSnackbar(<h6>Successfully Updated</h6>, { variant: 'success', });

      } catch (e) {
        this.props.enqueueSnackbar(<h6>Something went wrong</h6>, { variant: 'error', });

      }

    }
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title={this.state.name}
                content={
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail">Email</Label>
                          <Input type="email" required={true} disabled defaultValue={this.state.email} name="email" placeholder="Enter Email" onChange={this.handleChange.bind(this)} />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePassword">User ID</Label>
                          <Input type="text" required={true} disabled defaultValue={this.state.user_id} name="user_id" onChange={this.handleChange.bind(this)} placeholder="Enter User ID" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Name</Label>
                          <Input type="text" required={true} maxLength="30" defaultValue={this.state.name} name="name" placeholder="Enter name" onChange={this.handleChange.bind(this)} />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Designation</Label>
                          <Input type="text" required={true} maxLength="30" defaultValue={this.state.designation} name="designation" onChange={this.handleChange.bind(this)} placeholder="Enter Designation" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col md={12} >
                        <FormGroup>
                          <Label for="exampleText">Company Address</Label>
                          <Input type="textarea" required={true} maxLength="60" value={this.state.company_address} name="company_address" onChange={this.handleChange.bind(this)} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail">Company Name</Label>
                          <Input type="text" required={true} maxLength="30" defaultValue={this.state.company_name} name="company_name" placeholder="Enter company name" onChange={this.handleChange.bind(this)} />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePassword">Contact Person</Label>
                          <Input type="text" required={true} maxLength="30" defaultValue={this.state.contact_person} name="contact_person" onChange={this.handleChange.bind(this)} placeholder="Enter contact person" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Mobile Number</Label>
                          <Input type="number" required={true} maxLength="10" defaultValue={this.state.mobile} name="mobile" placeholder="Enter number" onChange={this.handleChange.bind(this)} />
                        </FormGroup>
                      </Col>
                    </Row>

                    {/* <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>About Me</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your description"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                    <Col md={3}>
                      <Label ></Label>
                      <FormGroup>
                        <Button type="submit" bsStyle="info" color="primary" pullRight fill >Update Profile</Button>
                      </FormGroup>
                    </Col>
                    {/* <Button bsStyle="info" color="primary" pullRight fill type="submit" onClick={this.handleSubmit.bind(this)}>
                      Update Profile
                    </Button> */}
                    <div className="clearfix" />
                  </form>
                }
              >

              </Card>
            </Col>
            <Col md={4}>
              <input type="file" id="file" ref="fileUploader" onChange={this.onFileChange.bind(this)} style={{ display: "none" }} />
              <div className="card card-user">
                <div className="image">
                  <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..." />
                </div>
                <div className="content">
                  <div className="author">
                    <a href="#pablo">
                      <div>
                        <img
                          className="avatar border-gray"
                          src={this.state.image}
                          alt="..."
                        />
                      </div>

                      <div>
                        <Pencil
                          type="button"
                          size={21}
                          onClick={() => this.edit_img()}
                        >
                        </Pencil>

                        <h4 className="title">
                          {/* {this.props.name} */}
                          <br />
                          <small>{this.state.name}</small>
                        </h4>
                      </div>

                    </a>
                  </div>
                  <p className="description text-center">{this.state.email}</p>
                </div>
                <hr />
                {/* <div className="text-center">{this.props.socials}</div> */}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withSnackbar(UserProfile);
