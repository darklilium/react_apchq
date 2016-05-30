import React from 'react';
import Griddle from 'griddle-react';
import {ap_getMedidorLocation} from '../../../js/services/ap_services/ap_getLocation-service';
import {ap_getLuminariaLocation} from '../../../js/services/ap_services/ap_getLocation-service';
import {myValuesSelected} from '../../../js/services/ap_services/ap_settings-service';
import mymap from '../../../js/services/map-service';
import layers from '../../../js/services/layers-service';

var HeaderComponent = React.createClass({
  textOnClick: function(e) {
    e.stopPropagation();
  },

  filterText: function(e) {
    this.props.filterByColumn(e.target.value, this.props.columnName)
  },

  render: function(){
    return (
      <span>
        <div><strong style={{color: this.props.color}}>{this.props.displayName}</strong></div>
        <input type='text' onChange={this.filterText} onClick={this.textOnClick} />
      </span>
    );
  }
});

class APInfo extends React.Component {
  constructor(props){
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
    myValuesSelected().delete();
  }



  onRowClick(gridRow, event){
    $('.table').find(".standard-row").eq(1).css("background", "#F5ECCE");


    var mapp = mymap.getMap();
    mapp.graphics.clear();

    if (layers.read_graphicLayer()){
        mapp.removeLayer(layers.read_graphicLayer());
    }

    switch (this.props.title) {
      case 'Medidores':
        $('.ap__info_wrapper-luminariasAsociadas').css('display', 'none');
        ap_getMedidorLocation(gridRow.props.data['ID EQUIPO']);
        myValuesSelected().writeIDMedidor(gridRow.props.data['ID EQUIPO']);
      break;

      case 'Luminarias':
        $('.ap__info_wrapper-luminariasAsociadas').css('display', 'none');
        ap_getLuminariaLocation(gridRow.props.data['ID LUMINARIA']);
        console.log(gridRow.props);
        myValuesSelected().writeIDLuminaria(gridRow.props.data['ID LUMINARIA']);
        myValuesSelected().writeIDEquipoLuminaria(gridRow.props.data['ID EQUIPO']);
      break;

      case 'Luminarias Asociadas':
        ap_getLuminariaLocation(gridRow.props.data['ID LUMINARIA']);
      break;

      default:

    }

  }

  render(){
    var columnMeta = [
      {
        "columnName": "ID LUMINARIA",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: 'green' }
      },
      {
        "columnName": "TIPO CONEXIÓN",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: 'green' }
      },
      {
        "columnName": "PROPIEDAD",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: 'green' }
      },
      {
        "columnName": "MEDIDO",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: 'green' }
      },
      {
        "columnName": "DESCRIPCION",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: 'green' }
      },
      {
        "columnName": "ROTULO",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: 'green' }
      },
      {
        "columnName": "ID EQUIPO",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: 'blue' }
      },
      {
        "columnName": "NIS",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: 'blue' }
      },
      {
        "columnName": "CANT LUMINARIAS",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: 'blue' }
      },
      {
        "columnName": "CANT TRAMOS",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: 'blue' }
      },
      {
        "columnName": "TIPO",
        "customHeaderComponent": HeaderComponent,
        "customHeaderComponentProps": { color: 'blue' }
      }

    ];
    return (

      <Griddle results={this.props.data}
        tableClassName="table"
        showFilter={false}
        showSettings={false}
        resultsPerPage={2}
        columnMetadata = {columnMeta}
        onRowClick={this.onRowClick}
        columns={this.props.columns}

        />

    );
  }
}

export default APInfo;
