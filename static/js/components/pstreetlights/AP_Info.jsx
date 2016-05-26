import React from 'react';
import Griddle from 'griddle-react';
import {ap_getMedidorLocation} from '../../../js/services/ap_services/ap_getLocation-service';
import {ap_getLuminariaLocation} from '../../../js/services/ap_services/ap_getLocation-service';
import {myValuesSelected} from '../../../js/services/ap_services/ap_settings-service';
import mymap from '../../../js/services/map-service';
import layers from '../../../js/services/layers-service';

class APInfo extends React.Component {
  constructor(props){
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
    myValuesSelected().delete();
  }



  onRowClick(gridRow, event){
    $('.table').find(".standard-row").eq(1).css("background", "#F5ECCE");
    $('.ap__info_wrapper-luminariasAsociadas').css('display', 'none');


    switch (this.props.title) {
      case 'Medidores':
      var mapp = mymap.getMap();
      mapp.graphics.clear();

      if (layers.read_graphicLayer()){
          mapp.removeLayer(layers.read_graphicLayer());
        
      }
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
