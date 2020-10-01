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
        title:"",
        description:""
      };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    try{
        const res = await axios.get('https://api.nileshjp.squareboat.info/v1/jobs/'+params.id);
        this.setState({
            title:res.data.data.title,
            description:res.data.data.description
        })
    }catch(err){
        console.log(err);
    }
  }
 
 
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title={this.state.title}
                content={
                  <form>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail">Job Title</Label>
                          <Input type="text" required={true} disabled defaultValue={this.state.title} name="title" placeholder="Enter Job Title" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Description</Label>
                          <Input type="textarea" disabled required={true}  value={this.state.description} name="description" placeholder="Enter Description"  />
                        </FormGroup>
                      </Col>
                     
                    </Row>
                   
    
                    <div className="clearfix" />
                  </form>
                }
              >

              </Card>
            </Col>
           
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withSnackbar(UserProfile);
