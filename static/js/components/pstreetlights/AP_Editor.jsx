import React from 'react';

class APEditor extends React.Component {
  constructor(props){
    super(props);
    this.onClickEditor = this.onClickEditor.bind(this);
  }

  onClickEditor(){
    console.log("clicking button");
  }
  render(){
    return (
    <div className="ap__editor_wrapper">

      <div className="ap__editor_wrapper_top">
        <div className="ap__editor_top_div">
            <h8>ID:</h8>
            <h8>ID NODO:</h8>
        </div>
        <div className="ap__editor_top_div-buttons">
            <button className="ap__editor_button ap__editor_button-top btn btn-default" title="Ver Fotos" type="button" onClick={this.onClickEditor}>
              <span><i className="fa fa-camera button-span"></i></span>
            </button>
            <button className="ap__editor_button ap__editor_button-top btn btn-default" title="Ver Detalle" type="button" onClick={this.onClickEditor}>
              <span><i className="fa fa-lightbulb-o button-span" ></i></span>
            </button>
        </div>
      </div>

      <div className="ap__editor_wrapper_mid">
          <h8>Tipo Conexión:</h8>
          <select className="ap__editor-combobox" title="Elija una opción de búsqueda" ref="searchType">
            <option value="DIRECTOREDBT">Directo Red BT</option>
            <option value="HILOPILOTO">Hilo Piloto</option>
            <option value="INDETERMINADA">Indeterminada</option>
            <option value="REDAP">Red AP</option>
          </select>
          <h8>Tipo:</h8>
          <select className="ap__editor-combobox" title="Elija una opción de búsqueda" ref="searchType">
            <option value="NA">NA</option>
            <option value="HG">HG</option>
            <option value="HALOGENO">Halogeno</option>
            <option value="HALUROMETALICO">Haluro Metálico</option>
            <option value="INCANDESCENTE">Incandescente</option>
            <option value="LED">LED</option>
            <option value="ORNAMENTAL">Ornamental</option>
          </select>
          <h8>Potencia:</h8>
          <select className="ap__editor-combobox" title="Elija una opción de búsqueda" ref="searchType">
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
            <option value="95">95</option>
            <option value="100">100</option>
            <option value="120">120</option>
            <option value="125">125</option>
            <option value="130">130</option>
            <option value="150">150</option>
            <option value="155">155</option>
            <option value="200">200</option>
            <option value="250">250</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
          <h8>Propiedad:</h8>
          <select className="ap__editor-combobox" title="Elija una opción de búsqueda" ref="searchType">
            <option value="EMPRESA">Empresa</option>
            <option value="PARTICULAR">Particular</option>
            <option value="MUNICIPAL">Municipal</option>
            <option value="OTRO">Otro</option>
            <option value="VIRTUAL">Virtual</option>
          </select>
           <h8>Rótulo Poste:</h8>
           <input className="ap__editor-input" ref="rotuloValue" title="Ingrese Rotulo" type="text" placeholder="" />
            <h8>Observaciones:</h8>
           <input className="ap__editor-input" ref="obsValue" title="Observación" type="text" placeholder="" />
      </div>


        <div className="ap__editor_wrapper_bot">
            <button className="ap__editor_button ap__editor_button-bot btn btn-default" title="Actualizar" type="button" onClick={this.onClickEditor}>
              <span><i className="fa fa-refresh"></i></span>
            </button>
            <button className="ap__editor_button ap__editor_button-bot btn btn-default" title="Eliminar" type="button" onClick={this.onClickEditor}>
              <span><i className="fa fa-trash-o"></i></span>
            </button>
            <button className="ap__editor_button ap__editor_button-bot btn btn-default" title="Nuevo" type="button" onClick={this.onClickEditor}>
              <span><i className="fa fa-plus-square-o"></i></span>
            </button>
        </div>
    </div>
    );
  }
}

export default APEditor;
