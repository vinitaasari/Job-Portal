
import Candidate from "views/Candidate";
import Job from "views/Candidate/job.jsx"
import Applied from "views/Candidate/applied.jsx"
import Vendor from "views/Vendor";
import Create from "views/Create";
import auth from './auth-helper';
import Admin from 'views/Admin'

var dashboardRoutes = [];
var a=0;

if(auth.isAuthenticated){
  if(auth.isAuthenticated().data){
    a = auth.isAuthenticated().data.role_Type;
  }

}

if(a==0){
  dashboardRoutes = [ {
    path: "/jobs",
    name: "Jobs",
    icon: "pe-7s-graph",
    component: Candidate,
    layout: "/admin",
    visible: true
  },
  {
    path: "/job/:id",
    name: "View Job",
    icon: "pe-7s-news-paper",
    component: Job,
    layout: "/admin",
    visible: false
  },
  {
    path: "/applied",
    name: "Applied Jobs",
    icon: "pe-7s-news-paper",
    component: Applied,
    layout: "/admin",
    visible: true
  },
  ]
}

if(a==1){
  dashboardRoutes = [ {
    path: "/myjobs",
    name: "Create Job",
    icon: "pe-7s-graph",
    component: Vendor,
    layout: "/admin",
    visible: true
  },
  {
    path: "/create",
    name: "Create Job",
    icon: "pe-7s-news-paper",
    component: Create,
    layout: "/admin",
    visible: false
  },
  ]
}

if(a==2){
  dashboardRoutes = [ {
    path: "/admin",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Admin,
    layout: "/admin",
    visible: true
  },
  ]
}

export default dashboardRoutes;
