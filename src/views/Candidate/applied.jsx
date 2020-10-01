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
import { Button } from '@material-ui/core';
import { allUsers } from 'api';
import { withSnackbar } from 'notistack';
import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { withRouter } from 'react-router-dom';
import auth from '../../auth-helper';
import axios from 'axios'

const jwt = auth.isAuthenticated();

class Table extends Component {

  constructor(props) {
    super(props);

    this.options = {
      insertBtn: this.insert.bind(this),
      // defaultSortName: 'name',  // default sort column name
      // defaultSortOrder: 'desc',  // default sort order
      onPageChange: this.onPageChange.bind(this),
      afterDeleteRow: this.onAfterDeleteRow.bind(this)
      // onSizePerPageList: this.sizePerPageListChange.bind(this)
    };
    this.state = {
      data: [],
      page: 1,
      perpage: 10,
      total: 0
    };
    this.onPageChange = this.onPageChange.bind(this);
    this.editt = this.editt.bind(this);
    this.getUsers = this.getUsers.bind(this);
    // this.sizePerPageListChange = this.sizePerPageListChange.bind(this);

  }
  insert = () => {
    return (
      <button style={{ color: 'red' }} >Add rows</button>
    );
  }
  async sizePerPageListChange(sizePerPage) {
    try{
      var res = await axios.get('https://api.nileshjp.squareboat.info/v1/jobs/applied', { params: { include:"job", page:this.state.page,perPage: sizePerPage},headers: {
        'Authorization': jwt.data.authToken
      } });
      if (res.data.data) {

        this.setState({
          perpage:sizePerPage,
          data: res.data.data,
          total: res.data.meta.pagination.total
        })
      }
    }catch(err){
      console.log(err);
    }
  }
  onAfterDeleteRow(rowKeys) {
    var users_array = [];
    var i;
    for (i = 0; i < rowKeys.length; i++) {
      users_array.push(rowKeys[i])
    }
    // console.log(users_array.length)
    // deleteUser({
    //   users: users_array
    // }, { t: auth.isAuthenticated().token }).then((data) => {
    //   if (data.success == true) {
    //     this.getUsers();
    //     this.props.enqueueSnackbar(<h6>Successfully Deleted</h6>, { variant: 'success', });

    //   } else {
    //     this.props.enqueueSnackbar(<h6>Something went Wrong</h6>, { variant: 'error', });
    //   }
    // })

  }
  async onPageChange(page, sizePerPage) {
    try{
      
      var res = await axios.get('https://api.nileshjp.squareboat.info/v1/jobs/applied', { params: { include:"job", page:page,perPage: sizePerPage},headers: {
        'Authorization': jwt.data.authToken
      } });
      if (res.data.data) {

        this.setState({
          page:page,
          perpage:sizePerPage,
          data: res.data.data,
          total: res.data.meta.pagination.total
        })
      }
    }catch(err){
      console.log(err);
    }

    // alert(`page: ${page}, sizePerPage: ${sizePerPage}`);
  }

  editt(cell, row, rowIndex) {
    this.props.history.push("/admin/job/" + row.jobId)
  }
  async getUsers() {
    try{
      
      var res = await axios.get('https://api.nileshjp.squareboat.info/v1/jobs/applied', { params: { include:"job", page: this.state.page,perPage: this.state.perpage},headers: {
        'Authorization': jwt.data.authToken
      } });
      if (res.data.data) {

        this.setState({
          data: res.data.data,
          total: res.data.meta.pagination.total
        })
      }
    }catch(err){
      console.log(err);
    }
  }
  async componentDidMount() {
    try{
      
      var res = await axios.get('https://api.nileshjp.squareboat.info/v1/jobs/applied', { params: { include:"job", page: this.state.page,perPage: this.state.perpage},headers: {
        'authorization': 'Bearer ' + auth.isAuthenticated().data.authToken
      } });
      if (res.data.data) {

        this.setState({
          data: res.data.data,
          total: res.data.meta.pagination.total
        })
      }
    }catch(err){
      console.log(err);
    }
  }
  insert() {
    console.log("hello");
  }
  buttonFormatter(cell, row, enumObject, rowIndex) {
    return (
      <div>
        {/* <Pencil color="royalblue" style={{ marginLeft: '.9rem' }} size={22}
          type="button"
          onClick={() =>
            this.editt(cell, row, rowIndex)}
        >
          Apply
        </Pencil> */}

      <Button onClick={() =>
            this.editt(cell, row, rowIndex)} variant="contained" color="secondary">
        View
      </Button>
      </div>
    )
  }

  render() {
    let jobs = this.state.data;
    let total = this.state.total;
    const selectRowProp = {
      mode: 'checkbox',
      bgColor: 'pink'
    };

    return (
      <div className="content">
        <h3><b>All Hot Jobs</b></h3>
        <BootstrapTable data={jobs} pagination options={this.options} remote={true}  fetchInfo={ { dataTotalSize: this.state.total } }>
          <TableHeaderColumn dataField='jobId' isKey={true} hidden={true} dataSort>Job ID</TableHeaderColumn>
          <TableHeaderColumn dataField='title'>Job Title</TableHeaderColumn>
          <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter.bind(this)}>Action</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default withRouter(withSnackbar(Table));
