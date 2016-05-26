import React from 'react';
import Griddle from 'griddle-react';
import {ap_getMedidorLocation} from '../../../js/services/ap_services/ap_getLocation-service';
import {ap_getLuminariaLocation} from '../../../js/services/ap_services/ap_getLocation-service';
import {myValuesSelected} from '../../../js/services/ap_services/ap_settings-service';

class APInfo extends React.Component {
  constructor(props){
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
    myValuesSelected().delete();
  }



  onRowClick(gridRow, event){
    $('.table').find(".standard-row").eq(1).css("background", "#F5ECCE");

    switch (this.props.title) {
      case 'Medidores':
        ap_getMedidorLocation(gridRow.props.data['ID EQUIPO']);
        myValuesSelected().writeIDMedidor(gridRow.props.data['ID EQUIPO']);
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

      <Griddle results={this.props.data}
        tableClassName="table"
        showFilter={true}
        showSettings={false}
        resultsPerPage={2}
        onRowClick={this.onRowClick}
        columns={this.props.columns}

        />

    );
  }
}

export default APInfo;
