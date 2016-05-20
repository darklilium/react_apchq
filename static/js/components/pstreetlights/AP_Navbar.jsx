import React from 'react';
import AllCapitalizeString from '../../../js/utils/AllCapitalizeString';
//import mymap from '../../../js/services/map-service';

class APNavBar extends React.Component {
  constructor(props){
    super(props);

  }




  render(){
    var imgSrc = "dist/css/images/cityhall_images/logos/logo_"+ this.props.imgLogo + ".png";

    var title = "Ilustre Municipalidad de "+ AllCapitalizeString(this.props.title);
    return (

    <div className="ap__navbar_wrapper">
      <div className="ap_navbar_wrapper_cityhall">
        <img className="ap_navbar_cityhall-logo" src={imgSrc}></img>
        <h6 className="ap_navbar_cityhall-title">{title}</h6>
      </div>

      <div className="ap_navbar_wrapper-buttons">
        <button className="ap_navbar_button btn btn-default" title="Buscar" type="button" onClick={this.props.onSearch}>
            <span><i className="fa fa-search"></i></span>
        </button>
      <button className="ap_navbar_button btn btn-default" title="Ver tabla Medidores" type="button" onClick={this.props.onMedidor}>
            <span><i className="fa fa-tachometer"></i></span>
        </button>
        <button className="ap_navbar_button btn btn-default" title="Ver Tabla Luminarias" type="button" onClick={this.props.onLuminarias}>
            <span><i className="fa fa-lightbulb-o"></i></span>
        </button>
        <button className="ap_navbar_button btn btn-default" title="Cambiar mapa" type="button" onClick={this.props.onChangeMap}>
            <span><i className="fa fa-globe"></i></span>
        </button>
        <button className="ap_navbar_button btn btn-default" title="Borrar búsquedas y dibujos" type="button" onClick={this.props.onClearMap}>
            <span><i className="fa fa-eraser"></i></span>
        </button>
      </div>
    </div>
    );
  }
}

export default APNavBar;
