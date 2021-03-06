//MobX Store
import { observable, action, computed, toJS } from 'mobx';
import moment from 'moment';
class Store {
  constructor() {}

  // FAVORED JOBS
  // CONTACTS FOR EACH JOB
  // ACTIONS FOR EACH JOB
  // PARAMETERS
  // USER ID
  // NEW JOB LIST

  @observable currentUserId = null; // this will be set at login time
  @observable userName = null;
  @observable params = [];
  @observable jobList = []; // jobs that are favored
  @observable newJobList = []; // jobs that need to be rated
  @observable filterText = { text: '' };
  @observable filterJobStatus = { status: '' };
  @observable actions = []; // all the actions for a person
  @observable company = {};
  @observable selectedActivityBox = -1;
  @observable actionFilter = 4863;
  @observable jobActions = [];
  @observable hiddenCompanyLetters = [];
  @observable viewingNewJobs = true;
  @observable hideLeftSideBarCompany = true;
  @observable userGoals = {
    apply: 0,
    applyTotal: 5,
    sentEmail: 0,
    sentEmailTotal: 5,
    interview: 0,
    interviewTotal: 2,
    like: 0,
    likeTotal: 7
  }
  @observable calculatedProgress = false;

  @observable addActivity = {
    type: '',
    company: '',
    description: '',
    scheduledTime: '',
    completedTime: '',
    actionSource: 'user',
    notes: '',
  };

  @observable contacts = [{
    firstname: 'Sandy',
    lastname: 'Knox',
    email: 'sandyk@airbnb.com'
  }, {
    firstname: 'Knox',
    lastname: 'Sandy',
    email: 'knoxs@airbnb.com'
  }];
  @observable newParam = {
    city: 'San Francisco',
    state: 'Ca',
    zip: 94100,
    descriptor: '',
    radius: '25'
  }
  @observable newTask = {
    actionSource: 'userInteraction',
    userId: undefined,
    jobId: '',
    company: '',
    description: '',
    type: '',
    scheduledTime: ''
  }
  @observable newJob = {
    jobTitle: '',
    company: '',
    url: '',
    address: '',
    city: '',
    state: '',
    snippet: '',
    source: 'user',
    origin: 'user',
    userid: '',
    id: ''
  }
  @observable newContact = {
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    mobilePhone: '',
    workPhone: '',
    notes: '',
  }
  @observable stats = {
    like: 0,
    applied: 0,
    phoneInterview: 0,
    webInterview: 0,
    personalInterview: 0,
    sentEmail: 0,
    phone: 0,
    receivedEmail: 0,
  };
  @observable lastWeekStats = {
    like: 0,
    applied: 0,
    phoneInterview: 0,
    webInterview: 0,
    personalInterview: 0,
    sentEmail: 0,
    phone: 0,
    receivedEmail: 0,
  };
  @observable monthly = [{
    like: 1,
    applied: 2,
    phoneInterview: 3,
    webInterview: 7,
    personalInterview: 2,
    sentEmail: 5,
    phone: 3,
    receivedEmail: 5
  }, {
    like: 2,
    applied: 3,
    phoneInterview: 3,
    webInterview: 7,
    personalInterview: 2,
    sentEmail: 3,
    phone: 3,
    receivedEmail: 7
  }, {
    like: 3,
    applied: 4,
    phoneInterview: 3,
    webInterview: 7,
    personalInterview: 2,
    sentEmail: 5,
    phone: 1,
    receivedEmail: 3
  }, {
    like: 4,
    applied: 2,
    phoneInterview: 3,
    webInterview: 7,
    personalInterview: 2,
    sentEmail: 10,
    phone: 6,
    receivedEmail: 7
  }];

  @observable jobStats = {};
  @computed get jobChart() {
    var data = [];
    data.push(this.jobStats.like);
    data.push(this.jobStats.applied);
    data.push(this.jobStats.phoneInterview);
    data.push(this.jobStats.webInterview);
    data.push(this.jobStats.personalInterview);
    data.push(this.jobStats.sentEmail);
    data.push(this.jobStats.receivedEmail);
    data.push(this.jobStats.phone);


    var results = {
      type: 'horizontalBar',
      data: {
        labels: ['Liked', 'Applied', 'Phone Interviews', 'Web Interviews', 'Personal Interviews', 'Emails Sent', 'Emails Received', '# of Phone calls'],
        datasets: [{
          label: '# of actions',
          data: data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(96, 96, 96, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(50, 255, 255, 0.2)',
            'rgba(0, 0, 0, 0.2)',
            'rgba(255, 153, 51, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255,99,132,1)',
            'rgba(96, 96, 96, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(50, 255, 255, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(255, 153, 51, 1)',
          ],
          borderWidth: 1
        }],
      },
      options: {
        resposive: false,
        maintainAspectRatio: true,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };
    return results;
  }

  @computed get monthBarChartStats() {
    // var like = [];
    // var applied = [];
    // var interviewed = [];
    // var sentEmail = [];
    // var phone = [];
    // var receivedEmail = [];
    // var offered = [];
    // for (var i = 0; i < this.monthly.length; i++) {
    //   like.push(this.monthly[i].like);
    //   applied.push(this.monthly[i].applied);
    //   interviewed.push(this.monthly[i].interviewed);
    //   sentEmail.push(this.monthly[i].sentEmail);
    //   phone.push(this.monthly[i].phone);
    //   receivedEmail.push(this.monthly[i].receivedEmail);
    //   offered.push(this.monthly[i].offered);
    // }
    var month = {
      '1': [],
      '2': [],
      '3': [],
      '4': [],
    };
    var createWeek = function(i) {
      month[i + 1].push(this.monthly[i].like);
      month[i + 1].push(this.monthly[i].applied);
      month[i + 1].push(this.monthly[i].phoneInterview);
      month[i + 1].push(this.monthly[i].webInterview);
      month[i + 1].push(this.monthly[i].personalInterview);
      month[i + 1].push(this.monthly[i].sentEmail);
      month[i + 1].push(this.monthly[i].receivedEmail);
      month[i + 1].push(this.monthly[i].phone);
    }.bind(this);

    for (var i = 0; i < this.monthly.length; i++) {
      if (i === 0) {
        createWeek(i);
      }
      if (i === 1) {
        createWeek(i);
      }
      if (i === 2) {
        createWeek(i);
      }
      if (i === 3) {
        createWeek(i);
      }
    }
    // console.log('log', like.length);
    //first feed array of likes
    //then applied, interviewed, offered
    var results = {
      type: 'horizontalBar',
      data: {
        labels: ['Liked', 'Applied', 'Phone Interviews', 'webInterviews', 'Personal Interviews', 'Emails Sent', 'Emails Received', '# of Phone calls'],
        datasets: [{
          label: '3 Weeks Ago',
          data: month[1],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',

          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',

          ],
          borderWidth: 1
        }, {
          label: '2 Weeks Ago',
          data: month[2],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }, {
          label: 'Last Week',
          data: month[3],
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }, {
          label: 'This Week',
          data: month[4],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }, ],
      },
      options: {
        resposive: false,
        maintainAspectRatio: true,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };

    return results;
  }
  @computed get barChartStats() {
    var statsArray = [];
    statsArray.push(this.stats.like);
    statsArray.push(this.stats.applied);
    statsArray.push(this.stats.phoneInterview);
    statsArray.push(this.stats.webInterview);
    statsArray.push(this.stats.personalInterview);
    statsArray.push(this.stats.phone);
    statsArray.push(this.stats.sentEmail);
    statsArray.push(this.stats.receivedEmail);

    var results = {
      type: 'horizontalBar',
      data: {
        labels: ['Liked', 'Applied', 'Phone Interviews', 'Web Interviews', 'Personal Interviews', 'Emails Sent', 'Emails Received', '# of Phone calls'],
        datasets: [{
          label: '# of actions',
          data: statsArray,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(96, 96, 96, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(50, 255, 255, 0.2)',
            'rgba(0, 0, 0, 0.2)',
            'rgba(255, 153, 51, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255,99,132,1)',
            'rgba(96, 96, 96, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(50, 255, 255, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(255, 153, 51, 1)',
          ],
          borderWidth: 1
        }],
      },
      options: {
        resposive: false,
        maintainAspectRatio: true,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };

    return results;
  }
  @observable average = {};
  @computed get averageStats() {
    var convertToArray = function(stats) {
      // console.log(stats);
      var resultArr = [];
      resultArr.push(stats.like);
      resultArr.push(stats.applied);
      resultArr.push(stats.phoneInterview);
      resultArr.push(stats.webInterview);
      resultArr.push(stats.personalInterview);
      resultArr.push(stats.sentEmail);
      resultArr.push(stats.receivedEmail);
      resultArr.push(stats.phone);
      return resultArr;
    };
    var averageStats = convertToArray(this.average.average);
    var userStats = convertToArray(this.average.user);
    // console.log(averageStats, userStats);
    var results = {
      type: 'horizontalBar',
      data: {
        labels: ['Liked', 'Applied', 'Phone Interviews', 'Web Interviews', 'Personal Interviews', 'Emails Sent', 'Emails Received', '# of Phone calls'],
        datasets: [{
          label: 'Average',
          data: averageStats,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',

          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',
            'rgba(255,99,132,1)',

          ],
          borderWidth: 1
        }, {
          label: 'You',
          data: userStats,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }, ],
      },
      options: {
        resposive: false,
        maintainAspectRatio: true,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };
    return results;
  }
  @computed get filteredList() {
    var context = this;
    return this.jobList.filter(function(company) {
      var text = context.filterText.text.toLowerCase();

      if (company.company.toLowerCase().includes(text)) {
        return true;
      }
      if (company.jobTitle.toLowerCase().includes(text)) {
        return true;
      }
      if (company.snippet.toLowerCase().includes(text)) {
        return true;
      }
    });
  }

  @computed get filteredJobsByStatus() {
    var context = this;
    var ret = context.jobList.filter(function(company) {
      var text = context.filterJobStatus.status.toLowerCase();
      if (text === '') {
        // console.log('company passed:', toJS(company));
        return true;
      }

      if (company.UserJob.status.toLowerCase().includes(text)) {
        // console.log('company passed: ', toJS(company));
        return true;
      } else {
        return false;
      }
    });

    // console.log('ret: ', ret);
    return ret;
      // if (company.jobTitle.toLowerCase().includes(text)) {
      //   return true;
      // }
      // if (company.snippet.toLowerCase().includes(text)) {
      //   return true;
      // }
  }


  @computed get filteredActions() {
    // var matchesFilter = new RegExp(this.filter, "i");
    // usea regex if working with strings
    return this.actions.filter(action => {
      return (action.id === this.filter);
    });
  }

  @computed get pendingNumber() {
    var pending = 0;
    this.actions.forEach((action, index) => {
      // action = toJS(action);
      if (!action.completedTime) {
        pending++;
      }
    });
    return pending;
  }

  @computed get activeTasks() {
    var ret = [];

    this.actions.forEach((action, index) => {
      if (!action.completedTime) {
        ret.push(action);
      }
    });
    // console.log('activeTasks: ', ret);
    return ret;
  }

  @computed get todaysTasks() {
    var ret = [];
    var today = moment();

    this.actions.forEach((action, index) => {
      var scheduled = moment(action.scheduledTime);

      var diff = scheduled.diff(today, 'days');
      // console.log('diff: ', diff);
      if (!action.completedTime && diff === 0) {
        ret.push(action);
      }
    });

    return ret;
  }

  // unrated jobs created today
  @computed get todaysJobs() {
    var ret = [];
    var today = moment();

    this.newJobList.forEach((job, index) => {
      var created = moment(job.createdAt);
      var diff = created.diff(today, 'days');

      if (diff === 0) {
        ret.push(job);
      }
    });

    return ret;
  }

  @action getTodaysCompleted() {
    // console.log('getTodaysCompleted');
    var today = moment();
    this.actions.forEach((action) => {
      if (action.completedTime) {
        var completed = moment(action.completedTime);
        var diff = today.diff(completed, 'days');
        // console.log("completed diff:", diff);
        if (diff === 0) {
          // console.log('action type:', action.type, this.userGoals[action.type]);
          if (this.userGoals[action.type] !== undefined) {
            // console.log('added');
            this.userGoals[action.type]++;
          }
        }
      }
    });
  }
}

const store = window.store = new Store();
export default store;
