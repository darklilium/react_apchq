import React from 'react';

//import mymap from '../../../js/services/map-service';

class APNavBar extends React.Component {
  constructor(props){
    super(props);
    this.onClickSearch = this.onClickSearch.bind(this);
  }

  onClickSearch(){
    console.log("clicking button");
  }
  render(){
    return (
    <div className="ap__navbar_wrapper">
      <div className="ap_navbar_wrapper_cityhall">
        <img className="ap_navbar_cityhall-logo"></img>
        <h6 className="ap_navbar_cityhall-title">Ilustre Municipalidad de la Cruz</h6>
      </div>

      <div className="ap_navbar_wrapper-buttons">
        <button className="ap_navbar_button btn btn-default" title="Buscar" type="button" onClick={this.onClickSearch}>
            <span><i className="fa fa-search"></i></span>
        </button>
        <button className="ap_navbar_button btn btn-default" title="Ver tabla Medidores" type="button" onClick={this.onClickSearch}>
            <span><i className="fa fa-tachometer"></i></span>
        </button>
        <button className="ap_navbar_button btn btn-default" title="Ver Tabla Luminarias" type="button" onClick={this.onClickSearch}>
            <span><i className="fa fa-lightbulb-o"></i></span>
        </button>
        <button className="ap_navbar_button btn btn-default" title="Cambiar mapa" type="button" onClick={this.onClickSearch}>
            <span><i className="fa fa-globe"></i></span>
        </button>
      </div>
    </div>
    );
  }
}

export default APNavBar;