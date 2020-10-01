
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/custom.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import store from 'store';
import AdminLayout from "layouts/Admin.jsx";
import Login from './views/Login'
import SignUp from './views/SignUp'
import auth from './auth-helper'

var a;
if(auth.isAuthenticated()){
  a= <BrowserRouter>
  <SnackbarProvider>
  <Switch>
    <Route path="/admin" render={props => <AdminLayout {...props} />} />
    <Redirect from="/" to="/admin/dashboard" />
  </Switch>
  </SnackbarProvider>
</BrowserRouter>
}
else{
  a=<BrowserRouter>
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Redirect from="/" to="/signup" />
  </Switch>
</BrowserRouter>
}
ReactDOM.render(
<Provider store={store}> {a}</Provider>
 ,
  document.getElementById("root")
);
