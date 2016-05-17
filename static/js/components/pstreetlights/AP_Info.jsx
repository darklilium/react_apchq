import React from 'react';
import Griddle from 'griddle-react';

var fakeData =  [
  {
    "id": 0,
    "name": 0,
    "city": 0,
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  }
];

class APInfo extends React.Component {
  constructor(props){
    super(props);

  }


  render(){
    return (
    /*<div><h6><b>  Listado de {this.props.title}</b></h6> */
    <Griddle results={this.props.data}
    tableClassName="table"
    showFilter={true}
    showSettings={true}
    resultsPerPage={2}
    columns={this.props.columns}/>
  /*  </div>*/
    );
  }
}

export default APInfo;
