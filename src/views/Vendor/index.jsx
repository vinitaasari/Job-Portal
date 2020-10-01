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
import axios from 'axios';
import { withSnackbar } from 'notistack';
import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
import auth from '../../auth-helper';
import { Card } from "../../components/Card/Card";




class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"",
            description:""
        };
    }

    handleChange(event) {
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            await axios({
                method: 'post',
                url: 'https://api.nileshjp.squareboat.info/v1/jobs/register',
                data: {
                  title:this.state.title,
                  description:this.state.description
                },
                headers: {
                    'authorization': 'Bearer ' + auth.isAuthenticated().data.authToken
                }
            })
          
            this.props.enqueueSnackbar(<h6>Successfully Created</h6>, { variant: 'success', });

        } catch (e) {
            console.log(e)
            this.props.enqueueSnackbar(<h6>Something went Worng!</h6>, { variant: 'error', });

        }
    }
    render() {
        const { openSnackbar, closeSnackbar } = this.props
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
                                                    <Label for="exampleEmail">Title</Label>
                                                    <Input type="text" required defaultValue={this.state.title} name="title" placeholder="Enter Title" onChange={this.handleChange.bind(this)} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="examplePassword">Description</Label>
                                                    <Input required type="textarea" defaultValue={this.state.description} name="description" onChange={this.handleChange.bind(this)} placeholder="Enter Description" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <div className="clearfix" />
                                        <button type="submit" > Create Job </button>
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
