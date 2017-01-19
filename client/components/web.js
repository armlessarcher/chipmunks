// entry point for web app
import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import {
  Router,
  browserHistory,
  Link,
  IndexLink
} from 'react-router';
import { toJS, observable } from 'mobx';
import axios from 'axios';

// locally defined
import Store from './Store';
import JobView from './JobView';
import SearchBar from './SearchBar';
import ShowParams from './ShowParams';
import CompanyList from './CompanyList';
import CompanyInfoRightSideBar from './CompanyInfoRightSideBar';
import LandingPage from './LandingPage';
import MainRightSidebar from './MainRightSidebar';
// serve individually?
import LoginPage from './LoginPage';


@observer class Web extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var context = this;
    axios.get('/user')
      .then(function(response) {
        Store.currentUserId = response.data.id;
        Store.userName = response.data.firstname + ' ' + response.data.lastname;
        // gets the list of "favored jobs"
        axios.get('/jobs/' + Store.currentUserId + '/favored')
          .then(function(response) {
            Store.jobList = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });


        // get new jobs
        axios.get('/jobs/' + Store.currentUserId + '/new')
          .then(function(response) {
            Store.newJobList = response.data;
            ///*******************  here is where I can get # of new jobs and updat the top
          })
          .catch(function(error) {
            console.log(error);
          });

        // get a list of upcomiing actions IMPLEMET LATER
        axios.get(`/actions/${Store.currentUserId}`)
          .then(function(response) {
            Store.actions = response.data;
            const { filteredActions } = Store;
            var result = filteredActions;
            Store.getTodaysCompleted();
          })
          .catch(function(error) {
            console.log(error);
          });

        // get parameters
        axios.get('/parameter/' + Store.currentUserId)
          .then(function(response) {
            Store.params = response.data.Parameters;
          })
          .catch(function(error) {
            console.log(error);
          });
        context.getStats();

      })
      .catch(function(error) {
        console.log(error);
      });

  }
  getStats() {
    setTimeout(() => {
      axios.get('/stats/' + Store.currentUserId)
        .then(function(response) {
          Store.stats = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });

      axios.get('/stats/monthly/' + Store.currentUserId)
        .then(function(response) {
          Store.monthly = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });

      axios.get('/stats/monthCompare/' + Store.currentUserId)
        .then(function(response) {
          Store.average = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      axios.get('/stats/jobStats/' + Store.currentUserId)
        .then(function(response) {
          Store.jobStats = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }, 1000);
  }


  render() {
    return (
      <div id="mainApp">
      <div className="navbar-fixed blue-color">
        <nav>
          <div className="nav-wrapper blue-color">
            <ul id="nav-mobile-left" className="left hide-on-med-and-down">
              <li><IndexLink to="/"><img src="./assets/icons/callback.png" /></IndexLink></li>
              <li><IndexLink to="/">Home</IndexLink></li>
            </ul>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><SearchBar /></li>
              <li><Link to={'/rateJobs'}>Rate New Jobs</Link></li>
              <li><Link to={'/addJob'}>Add Job</Link></li>
              <li><Link to={'/preferences'}>Settings</Link></li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="container">
        <div className="row">
          <div className="col m2 left">
            <CompanyList />
          </div>
          <div className="col m10">
            {this.props.children}
          </div>
        </div>
      </div>
     </div>
    );
  }
}

export default Web;
