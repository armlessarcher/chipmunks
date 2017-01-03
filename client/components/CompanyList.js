import React, { Component } from 'react';
import { observer } from 'mobx-react';
import mobx from 'mobx';
import Store from './Store';
import CompanyRow from './CompanyRow';

@observer class CompanyList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var list = Store.jobList.slice();
    console.log(list);
    return (
      <div>
    {list.map((company, index) => {
      company = mobx.toJS(company);
      console.log(company);
      if (company.company.toLowerCase().includes(Store.filterText.text.toLowerCase())) {
        return <CompanyRow company={company} key={index} />;
      }
    })}
    </div>
    );
  }
}

export default CompanyList;
