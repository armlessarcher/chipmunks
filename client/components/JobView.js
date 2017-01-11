import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Store from './Store';
import HistoryItem from './HistoryItem';
import JobContacts from './JobContacts';
import axios from 'axios';
import JobDescription from './JobDescription';
import TaskBox from './TaskBox';
import CompanyInfoRightSideBar from './CompanyInfoRightSideBar';

@observer class JobView extends Component {
  constructor(props) {
    super(props);
  }

  filterForHistory(action) {
    return !!action.completedTime;
  }
  filterForTask(action) {
    return !action.completedTime;
  }
 
  componentWillReceiveProps() {
    
    axios.get('/actions/' + Store.currentUserId + '/' + this.props.params.id) //need to filter by company later
      .then(function(response) {
        Store.actions = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  change(e) {
    Store.newTask[e.target.name] = e.target.value;
  }

  render() {
    var step = Store.jobList.slice();
    var location = 0;
    
    // stopped here Tuesday night
    var thisJob = step.map((job, index) => {
      if (job.id === this.props.params.id) {
        location = index;
      }
    }); 

    thisJob = toJS(step[location]);
   
    var jobActions = Store.actions.slice();
    jobActions = toJS(jobActions);

    return (
      <div>
        
        <div className="col m2 right"> {/* this is where the right naV bar will go:*/}
          <div className="hello">
            <CompanyInfoRightSideBar job={thisJob}/>
          </div>
        </div>
        
        <div className="col m8 center">
          <div className='jobView'>
            <JobDescription job={thisJob}/>
            <div className="companyStats">
              <div className="companyStatsBox"> 
              # days since last action
              </div>
              <div className="companyStatsBox"> 
              # days active
              </div>
              <div className="companyStatsBox">
              # of interactions 
              </div>
            </div>
            <div className="companyTasks">
              {jobActions.map((action, index) => {
                return ( <TaskBox task={action} key={index}/>);
              })
            }
            </div>
          </div>
        </div>

     </div> 
    );
  }
}

export default JobView;





