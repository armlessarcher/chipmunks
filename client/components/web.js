// entry point for web app
import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { observable, computed, autorun } from 'mobx';
import mobx from 'mobx';
import Store from './Store';
import JobView from './JobView';
import SearchBar from './SearchBar';
import SelectParams from './SelectParams';
import CompanyList from './CompanyList';


var Web = @observer class Web extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <SelectParams />
          <SearchBar />
          <CompanyList />
          <JobView />
        </div>
    );
  }
};

ReactDOM.render(<Web />, document.getElementById('web'));