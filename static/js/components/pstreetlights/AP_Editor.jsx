import React from 'react';
import ReactTabs from 'react-tabs';
import { createStore, combineReducers } from 'redux';


var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

  class APEditor extends React.Component {
  constructor(props){
    super(props);
    // suscribe.
    store.subscribe(this.forceUpdate.bind(this));

    this.onClickEditor = this.onClickEditor.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
    this.setAttributes  = this.setAttributes.bind(this);

    this.state = {
      idlum: '',
      idnodo: '',
      tipoconexion: '',
      tipoluminaria: '',
      potencia: '',
      propiedad: '',
      empresa:'',
      rotulo:'',
      observaciones: ''
    };

  }
  componentDidMount(){
    return function(){
       store.dispatch({
         type: 'CLICKED'
       });
     };
  }

  setAttributes(evt){
    console.log("hello",evt);
    this.setState({idlum: evt.graphic.attributes['ID_LUMINARIA']});
  }
  onClickEditor(){
    console.log("clicking button");
  }

  onClickClose(){
    $('.ap_wrapper-editor').css('visibility', 'hidden').css('display','none');
  }
  render(){
     const basketProducts = store.getState().EditorState;

    return (
    <div className="ap_wrapper-editor">
    <button className="ap_editor_button-close ap__editor_button ap__editor_button-bot btn btn-default" title="Cerrar Ventana" type="button" onClick={this.onClickClose} >
      <span><i className="fa fa-close"></i></span>
    </button>
      <Tabs>
        <TabList>
          <Tab><i className="fa fa-info"></i></Tab>
          <Tab><i className="fa fa-camera button-span" aria-hidden="true"></i></Tab>
        </TabList>

        <TabPanel>

          <div className="ap_wrapper-editor-top">
            <h8 id="ap_lblIDLuminaria">ID Luminaria: {this.state.idlum}</h8>
            <h8 id="ap_lblIDNodo">ID Nodo: {this.state.idnodo}</h8>
          </div>

          <div className="ap_wrapper-editor-mid">
            <h8>Tipo Conexión:</h8>
            <select id="ap_cbTipoConexion" className="ap__editor-combobox" title="Elija una opción " ref="searchType" value={this.state.tipoconexion}>
              <option value="DIRECTOREDBT">Directo Red BT</option>
              <option value="HILOPILOTO">Hilo Piloto</option>
              <option value="INDETERMINADA">Indeterminada</option>
              <option value="REDAP">Red AP</option></select>
            <h8>Tipo:</h8>
            <select id="ap_cbTipoLuminaria" className="ap__editor-combobox" title="Elija una opción " ref="searchType"  value={this.state.tipoluminaria}>
              <option value="NA">NA</option>
              <option value="HG">HG</option>
              <option value="HALOGENO">Halogeno</option>
              <option value="HALUROMETALICO">Haluro Metálico</option>
              <option value="INCANDESCENTE">Incandescente</option>
              <option value="LED">LED</option>
              <option value="ORNAMENTAL">Ornamental</option></select>
            <h8>Potencia:</h8>
            <select id="ap_cbPotenciaLuminaria" className="ap__editor-combobox" title="Elija una opción " ref="searchType"  value={this.state.potencia}>
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
              <option value="1000">1000</option></select>
            <h8>Propiedad:</h8>
            <select id="ap_cbPropiedadLuminaria" className="ap__editor-combobox" title="Elija una opción de búsqueda" ref="searchType" value={this.state.propiedad}>
              <option value="EMPRESA">Empresa</option>
              <option value="PARTICULAR">Particular</option>
              <option value="MUNICIPAL">Municipal</option>
              <option value="OTRO">Otro</option>
              <option value="VIRTUAL">Virtual</option></select>
            <h8>Rótulo Poste:</h8>
            <input id="ap_txtRotuloLuminaria" className="ap__editor-input" ref="rotuloValue" title="Ingrese Rotulo" type="text" placeholder="Rotulo de la luminaria" value={this.state.rotulo} />
            <h8>Observaciones:</h8>
            <input id="ap_txtObsLuminaria" className="ap__editor-input" ref="obsValue" title="Observación" type="text" placeholder="Sus observaciones aquí" value={this.state.observaciones}/>
          </div>

          <div className="ap_wrapper-editor-bot">
            <button className="ap__editor_button ap__editor_button-bot btn btn-default" title="Actualizar" type="button" onClick={this.onClickEditor}>
              <span><i className="fa fa-refresh"></i></span>
            </button>
            <button className="ap__editor_button ap__editor_button-bot btn btn-default" title="Eliminar" type="button" onClick={this.onClickEditor}>
              <span><i className="fa fa-trash-o"></i></span>
            </button>
            <button className="ap__editor_button ap__editor_button-bot btn btn-default" title="Nuevo" type="button" onClick={this.onClickEditor}>
              <span><i className="fa fa-plus"></i></span>
            </button>
          </div>

        </TabPanel>

            <TabPanel>
              <div className="ap_wrapper_picture-top">
                <button className="btn btn-default" title="Ver Fotos" type="button">
                  <span><i className="fa fa-chevron-left button-span"></i></span>
                </button>
                 <h8>1</h8>
                 <h8>de</h8>
                 <h8>2</h8>
                <button className="btn btn-default" title="Ver Fotos" type="button">
                  <span><i className="fa fa-chevron-right button-span"></i></span>
                </button>
              </div>

              <div className="ap_wrapper_picture-mid">
                  <img></img>
              </div>
              <div className="ap_wrapper_picture-bot">
                  <button className="btn btn-default" title="Actualizar" type="button">
                    <span><i className="fa fa-undo"></i></span>
                  </button>
                  <button className="btn btn-default" title="Eliminar" type="button">
                    <span><i className="fa fa-repeat"></i></span>
                  </button>
              </div>
            </TabPanel>

      </Tabs>
    </div>
    );
  }
}

//redux
//Reducer del componente.

function EditorState(previousState = [], action){
  switch(action.type){
    case 'CLICKED':
    console.log("aa");
      return cookieHandler.get('crrntgrphc');

    default:
      return previousState;
  }
}

//combinar reducers en uno
var rootReducer = combineReducers({ EditorState });

//crea la store
var store = createStore(rootReducer);

store.subscribe(()=> console.log('nuevo estado',store.getState()));

export default APEditor;
