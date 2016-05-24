import React from 'react';
import Griddle from 'griddle-react';

import {ap_getMedidorLocation} from '../../../js/services/ap_services/ap_getLocation-service';
import {ap_getLuminariaLocation} from '../../../js/services/ap_services/ap_getLocation-service';
class APInfo extends React.Component {
  constructor(props){
    super(props);
    this.onRowClick = this.onRowClick.bind(this);

  }

  onRowClick(gridRow, event){


    switch (this.props.title) {
      case 'Medidores':
        ap_getMedidorLocation(gridRow.props.data['ID EQUIPO']);
      break;

      case 'Luminarias':
      ap_getLuminariaLocation(gridRow.props.data['ID LUMINARIA']);
      break;

      case 'Luminarias Asociadas':

      break;

      default:

    }

  }

  render(){
    return (
    /*<div><h6><b>  Listado de {this.props.title}</b></h6> */
    <Griddle results={this.props.data}
    tableClassName="table"
    showFilter={true}
    showSettings={true}
    resultsPerPage={2}
    onRowClick={this.onRowClick}
    columns={this.props.columns}/>
  /*  </div>*/
    );
  }
}

export default APInfo;
