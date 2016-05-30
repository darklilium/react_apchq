import React from 'react';
import mymap from '../../../js/services/map-service';
import layers from '../../../js/services/layers-service';
import APNavBar from '../pstreetlights/AP_Navbar.jsx';
import APSearch from '../pstreetlights/AP_Search.jsx';
import APEditor from '../pstreetlights/AP_Editor.jsx';
import APInfo from '../pstreetlights/AP_Info.jsx';
import LayerList from '../../../js/components/LayerList.jsx';
import my_AP_Settings from '../../../js/services/ap_services/ap_settings-service';
import {addCertainLayer} from '../../../js/services/layers-service';
import {layersActivated} from '../../../js/services/layers-service';
import {ap_getDataMedidores} from '../../../js/services/ap_services/ap_getData-service';
import {ap_getDataLuminarias} from '../../../js/services/ap_services/ap_getData-service';
import {ap_getTramosMedidor} from '../../../js/services/ap_services/ap_getData-service';
import {ap_getTramosLuminaria} from '../../../js/services/ap_services/ap_getData-service';
import {myValuesSelected} from '../../../js/services/ap_services/ap_settings-service';
import {ap_getDataLuminariasAsociadas} from '../../../js/services/ap_services/ap_getData-service';
import {ap_getMedidorLocation} from '../../../js/services/ap_services/ap_getLocation-service';
import {setLayers} from '../../../js/services/layers-service';
//import {ap_exportGraphicsToPDF} from '../../../js/services/ap_services/ap_exportToPdf';

import {ap_exportToExcel} from '../../../js/services/ap_services/ap_exportToExcel';
import {myDisplayedMedidor} from '../../../js/services/ap_services/ap_settings-service';
import {myDisplayedLuminaria} from '../../../js/services/ap_services/ap_settings-service';
import {myDisplayedLuminariaAsociada} from '../../../js/services/ap_services/ap_settings-service';

class AlumbradoPublico extends React.Component {

  constructor(props){
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onMedidor = this.onMedidor.bind(this);
    this.onLuminarias = this.onLuminarias.bind(this);
    this.onChangeMap = this.onChangeMap.bind(this);
    this.onClearMap = this.onClearMap.bind(this);
    this.onShowTramos = this.onShowTramos.bind(this);
    this.onShowLumAsoc = this.onShowLumAsoc.bind(this);
    this.onShowMedidorAsoc = this.onShowMedidorAsoc.bind(this);
    this.onShowRelatedLumAsoc = this.onShowRelatedLumAsoc.bind(this);
    this.onDownLoad = this.onDownLoad.bind(this);

    this.state ={
      onSearch: 0,
      onMedidor: 0,
      onLuminarias: 0,
      onAsociadas: 0,
      onChangeMap: 0,
      columnsMedidores: [],
      columnsLuminarias: [],
      dataMedidores: [],
      dataLuminarias: [],
      dataLuminariasAsociadas: [],
      settings: [],
      mapClick : 0,
      idEquipoapSelected: 0

    };
  }

  componentWillMount(){
    this.setState({settings: my_AP_Settings.read()});

  }

  componentDidMount(){
    //prod build
    /*
    my_AP_Settings.delete();
    var map = mymap.createMap("map_div","topo",this.state.settings.latx,this.state.settings.laty, this.state.settings.zoom);
    */
    //dev build

    var settings = my_AP_Settings.read();
    var map = mymap.createMap("map_div","topo",settings.latx,settings.laty, settings.zoom);

    addCertainLayer("ap_comuna", 11, "nombre='"+this.state.settings.comuna+"'");
    addCertainLayer("ap_tramos", 12, "COMUNA='"+this.state.settings.comuna+"'");
    addCertainLayer("ap_luminarias", 13, "COMUNA='"+this.state.settings.comuna+"'");

    ap_getDataMedidores(this.state.settings.comuna,(callback)=>{
      this.setState({dataMedidores:callback});
    });

    ap_getDataLuminarias(this.state.settings.comuna,(callback)=>{
      this.setState({dataLuminarias:callback});
    });

  }

  onSearch(){
    console.log("onsearch clicked");
    if (this.state.onSearch==0){
      this.setState({ onSearch : 1 });
      $('.ap__search_wrapper').css('visibility', 'visible');
      $('.ap_wrapper-editor').css('visibility', 'hidden');
      return;
    }
    this.setState({ onSearch : 0 });
    $('.ap__search_wrapper').css('visibility', 'hidden');
    $('.ap_search_notifications').empty().css('visibility', 'hidden');
  }

  onMedidor(){
    this.setState({columnsMedidores: ['ID EQUIPO', 'NIS', 'CANT LUMINARIAS', 'CANT TRAMOS', 'TIPO', 'ROTULO'] });

    $('.ap__info_wrapper-medidores').css('display', 'flex');
    $('.ap__info_wrapper-luminariasAsociadas').css('display', 'none');
    $('.ap_wrapper-editor').css('visibility', 'hidden').css('display','none');

    myDisplayedLuminariaAsociada.setMyDisplayedAsociada('not displayed');
    myDisplayedMedidor.setMyDisplayedMedidor('displayed');

    if (this.state.onMedidor == 0){
      this.setState({onMedidor: 1})
      $('.ap__info_wrapper-medidores').css('visibility', 'visible');
      myDisplayedMedidor.setMyDisplayedMedidor('displayed');

        if(this.state.onLuminarias==0){
          $('.ap__wrapper-tables').css('flex-direction', 'column');
          $('.ap__info_wrapper-luminarias').css('display', 'none');
          myDisplayedLuminaria.setMyDisplayedLuminaria('not displayed');

        }else{
          myDisplayedLuminaria.setMyDisplayedLuminaria('displayed');
          $('.ap__wrapper-tables').css('flex-direction', 'column-reverse');
        }

    }else{
      this.setState({onMedidor: 0})
        $('.ap__info_wrapper-medidores').css('visibility', 'hidden');
        $('.ap__info_wrapper-medidores').css('display', 'none');
        myDisplayedMedidor.setMyDisplayedMedidor('not displayed');
    }
      console.log(myDisplayedMedidor.getMyDisplayedMedidor());
  }

  onLuminarias(){
    console.log("onLuminarias clicked");
    this.setState({columnsLuminarias: ['ID LUMINARIA', 'TIPO CONEXIÓN', 'PROPIEDAD', 'MEDIDO', 'DESCRIPCION', 'ROTULO'] });
    $('.ap__info_wrapper-luminariasAsociadas').css('display', 'none');
    $('.ap__info_wrapper-luminarias').css('display', 'flex');
    $('.ap_wrapper-editor').css('visibility', 'hidden').css('display','none');
    

    myDisplayedLuminariaAsociada.setMyDisplayedAsociada('not displayed');
    myDisplayedLuminaria.setMyDisplayedLuminaria('not displayed');

    if (this.state.onLuminarias == 0){
      this.setState({onLuminarias: 1});

      $('.ap__info_wrapper-luminarias').css('visibility', 'visible');
      myDisplayedLuminaria.setMyDisplayedLuminaria('displayed');

        if(this.state.onMedidor==0){
          console.log("onMedidor esta apagado");
          $('.ap__wrapper-tables').css('flex-direction', 'column');
          $('.ap__info_wrapper-medidores').css('display', 'none');
          myDisplayedMedidor.setMyDisplayedMedidor('not displayed');

        }else{
          console.log("onMedidor visible");
          $('.ap__wrapper-tables').css('flex-direction', 'column-reverse');
          myDisplayedMedidor.setMyDisplayedMedidor('displayed');
        }


    }else{
        this.setState({onLuminarias: 0});
      $('.ap__info_wrapper-luminarias').css('visibility', 'hidden');
      $('.ap__info_wrapper-luminarias').css('display', 'none');
      myDisplayedLuminaria.setMyDisplayedLuminaria('not displayed');
    }
      console.log(myDisplayedLuminaria.getMyDisplayedLuminaria());
  }

  onChangeMap(){
    console.log("onChangeMap clicked");
    var myActiveLayers = layersActivated().getMapLayers();
    console.log("mis layers",myActiveLayers);
      var mapp = mymap.getMap();

      if (this.state.mapClick==0){
        this.setState({ mapClick : 1 });
        mymap.changeBasemap("hybrid");


      }else if(this.state.mapClick==1){
        this.setState({ mapClick : 2 });
        mymap.changeBasemap("Chilquinta");


      }else {
        this.setState({ mapClick : 0 });
        mymap.changeBasemap("topo");

      }
      addCertainLayer("ap_comuna", 11, "nombre='"+this.state.settings.comuna+"'");
      addCertainLayer("ap_tramos", 12, "COMUNA='"+this.state.settings.comuna+"'");
      addCertainLayer("ap_luminarias", 13, "COMUNA='"+this.state.settings.comuna+"'");

  }

  onClearMap(){
    console.log("clearing map");
    var map = mymap.getMap();
    map.graphics.clear();
    $('.ap_search_notifications').empty().css('visibility', 'hidden');

    if (layers.read_graphicLayer()){
        map.removeLayer(layers.read_graphicLayer());
      return;
    }

  }

  onShowTramos(event){
    switch (event.currentTarget.id) {

    case 'btnShowTramosMedidor':
      console.log("showing related trail medidor");
        if (myValuesSelected().read()==null){
          console.log("debe guardar un valor de id medidor");
        }else{
          let myValues = myValuesSelected().read();
          ap_getTramosMedidor(myValues['idMedidor'], this.state.settings.comuna);
        }
    break;

    case 'btnShowTramosLuminaria':
      console.log("showing related trail luminaria");
      if (myValuesSelected().read()==null){
        console.log("debe guardar un valor de id luminaria");
      }else{
        let myValues = myValuesSelected().read();
        if(myValues['idEquipoLuminaria']==0){
          console.log("no hay id equipo para esta luminaria, no se puede dibujar tramo.");
          return;
        }
        ap_getTramosMedidor(myValues['idEquipoLuminaria'], this.state.settings.comuna);
      }
    break;

    default:

    }

  }

  onShowLumAsoc(){

    if (this.state.onAsociadas == 0){
      this.setState({onAsociadas: 1});

      console.log("showing related lights and drawing them");
      $('.ap__info_wrapper-luminarias').css('display', 'none');
      $('.ap__info_wrapper-luminarias').css('visibility', 'hidden');
      this.setState({onLuminarias: 0});
      myDisplayedLuminaria.setMyDisplayedLuminaria('not displayed');

        if (myValuesSelected().read()==null){
            console.log("debe guardar un valor de id medidor para mostrar luminarias asociadas");
        }else{
            let myValues = myValuesSelected().read();
            ap_getDataLuminariasAsociadas(this.state.settings.comuna,myValues['idMedidor'],(callback)=>{
            this.setState({dataLuminariasAsociadas:callback.dataForTable});

            //show griddle for luminarias asociadas
              $('.ap__info_wrapper-luminariasAsociadas').css('display', 'flex');
              $('.ap__info_wrapper-luminariasAsociadas').css('visibility', 'visible');
              myDisplayedLuminariaAsociada.setMyDisplayedAsociada('displayed');
          });
        }
      }else{
        this.setState({onAsociadas: 0});
        $('.ap__info_wrapper-luminariasAsociadas').css('display', 'none');
        $('.ap__info_wrapper-luminariasAsociadas').css('visibility', 'hidden');
      }
    console.log(myDisplayedLuminariaAsociada.getMyDisplayedAsociada());
  }

  onShowMedidorAsoc(){
      console.log("showing related meter");
      if (myValuesSelected().read()==null){
        console.log("debe guardar un valor de id medidor para mostrar su ubicación a la luminaria asociada");
      }else{
          let myValues = myValuesSelected().read();
        if(myValues['idEquipoLuminaria']==0){
          console.log("no hay id equipo para esta luminaria, no se puede dibujar tramo.");
          return;
        }
        ap_getMedidorLocation(myValues['idEquipoLuminaria']);
      }
  }

  onShowRelatedLumAsoc(){
    console.log(this.state.onAsociadas);
    if (this.state.onAsociadas == 0){
      this.setState({onAsociadas: 1});

      console.log("showing related streetlights for the cirtuit");
      $('.ap__info_wrapper-medidores').css('display', 'none');
      $('.ap__info_wrapper-medidores').css('visibility', 'hidden');
      this.setState({onMedidor: 0});

      if (myValuesSelected().read()==null){
          console.log("debe guardar un valor de id medidor para mostrar luminarias asociadas");
      }else{
        let myValues = myValuesSelected().read();

        if(myValues['idEquipoLuminaria']==0){
          console.log("no hay id equipo para esta luminaria, no se puede encontrar relación entre luminarias.");
          return;
        }
        ap_getDataLuminariasAsociadas(this.state.settings.comuna,myValues['idEquipoLuminaria'],(callback)=>{
        this.setState({dataLuminariasAsociadas:callback.dataForTable});

        //show griddle for luminarias asociadas
          $('.ap__info_wrapper-luminariasAsociadas').css('display', 'flex');
          $('.ap__info_wrapper-luminariasAsociadas').css('visibility', 'visible');
        });
      }

    }else{
      this.setState({onAsociadas: 0});
      $('.ap__info_wrapper-luminariasAsociadas').css('display', 'none');
      $('.ap__info_wrapper-luminariasAsociadas').css('visibility', 'hidden');
    }


  }

  onDownLoad(event){
    switch (event.currentTarget.id) {
      case 'btnDownloadInfoMedidor':
        console.log("boton medidor download");
        //  ap_exportGraphicsToPDF(this.state.dataMedidores,'MEDIDORES', this.state.settings.comuna);

        ap_exportToExcel(this.state.dataMedidores,'MEDIDORES '+this.state.settings.comuna, this.state.columnsMedidores);
      break;

      case 'btnDownloadInfoLuminariasAsoc':
        console.log("boton luminarias asociadas download");
          //ap_exportGraphicsToPDF(this.state.dataLuminariasAsociadas,'LUMINARIAS_ASOCIADAS');
          let myValues = myValuesSelected().read();
          ap_exportToExcel(this.state.dataLuminariasAsociadas,'Luminarias Asociadas al medidor:' + myValues['idMedidor']+ " de "+this.state.settings.comuna, this.state.columnsMedidores);
      break;

      case 'btnDownloadInfoLuminarias':
        console.log("boton luminarias download");
          //ap_exportGraphicsToPDF(this.state.dataLuminarias,'LUMINARIAS');

          ap_exportToExcel(this.state.dataLuminarias,'Luminarias de '+this.state.settings.comuna, this.state.columnsMedidores);

      break;
      default:

    }
  }


  render(){
    let region = this.state.settings.comuna;
    let noneStyle = {display: 'none'};
    return (
    <div className="ap__wrapper">

    <div className="map_div" id="map_div"></div>

    <APNavBar imgLogo={this.state.settings.logo} title={this.state.settings.comuna}
              onSearch={this.onSearch}
              onMedidor={this.onMedidor}
              onLuminarias={this.onLuminarias}
              onChangeMap={this.onChangeMap}
              onClearMap={this.onClearMap}/>

    <APSearch region={region}/>

    <div className="ap_search_notifications"></div>

    <APEditor />

    <div className="ap__wrapper-tables">

      <div id ="wrapper_medidores" style={noneStyle} className="ap__info_wrapper-medidores">
        <div className="medidores_filter">
          <div className="medidores_tools">
            <div className="medidores_tools_h6 h6_medidores"><h6>Medidores</h6></div>
              <div className="medidores_tools_buttons">
                <button className="ap_table_navbar ap_navbar_button btn btn-default" id="btnShowTramosMedidor" title="Ver Tramos" type="button" onClick={this.onShowTramos} >
                    <span><i className="fa fa-code-fork "></i></span>
                </button>
                <button className="ap_table_navbar ap_navbar_button btn btn-default" id="btnShowLumMedidor" title="Ver Luminarias Asociadas" type="button" onClick={this.onShowLumAsoc} >
                    <span><i className="fa fa-lightbulb-o"></i></span>
                </button>
                <button className="ap_table_navbar ap_navbar_button btn btn-default" id="btnDownloadInfoMedidor" title="Descargar info." type="button" onClick={this.onDownLoad}  >
                    <span><i className="fa fa-download"></i></span>
                </button>
              </div>
          </div>
          <APInfo title={"Medidores"} columns={this.state.columnsMedidores} data={this.state.dataMedidores} comuna={this.state.settings.comuna} />
        </div>
      </div>

      <div id ="wrapper_luminariasAsociadas" style={noneStyle} className="ap__info_wrapper-luminariasAsociadas">
        <div className="medidores_filter">
          <div className="medidores_tools">
            <div className="medidores_tools_h6 h6_luminariasAsociadas"><h6>Lum.Asoc </h6></div>
              <div className="medidores_tools_buttons">
                <button className="ap_table_navbar ap_navbar_button btn btn-default" id="btnDownloadInfoLuminariasAsoc" title="Descargar info." type="button" onClick={this.onDownLoad}>
                    <span><i className="fa fa-download"></i></span>
                </button>

              </div>
          </div>
          <APInfo title={"Luminarias Asociadas"} columns={this.state.columnsLuminarias} data={this.state.dataLuminariasAsociadas} comuna={this.state.settings.comuna}/>

        </div>
      </div>

      <div id ="wrapper_luminarias" style={noneStyle} className="ap__info_wrapper-luminarias">
        <div className="medidores_filter">
          <div className="medidores_tools">
            <div className="medidores_tools_h6 h6_luminarias"><h6>Luminarias</h6></div>
            <div className="medidores_tools_buttons">
              <button className="ap_table_navbar ap_navbar_button btn btn-default" id="btnShowTramosLuminaria" title="Ver Tramos" type="button" onClick={this.onShowTramos}>
                  <span><i className="fa fa-code-fork "></i></span>
              </button>
              <button className="ap_table_navbar ap_navbar_button btn btn-default" id="btnShowMedidorAsoc" title="Mostrar Ubicación Medidor." type="button" onClick={this.onShowMedidorAsoc}>
                  <span><i className="fa fa-tachometer"></i></span>
              </button>
              <button className="ap_table_navbar ap_navbar_button btn btn-default" id="btnShowLumLuminaria" title="Ver Luminarias" type="button" onClick={this.onShowRelatedLumAsoc}>
                  <span><i className="fa fa-lightbulb-o"></i></span>
              </button>
              <button className="ap_table_navbar ap_navbar_button btn btn-default" id="btnDownloadInfoLuminarias" title="Descargar info." type="button" onClick={this.onDownLoad}>
                  <span><i className="fa fa-download"></i></span>
              </button>

            </div>
          </div>
          <APInfo title={"Luminarias"} columns={this.state.columnsLuminarias} data={this.state.dataLuminarias} comuna={this.state.settings.comuna}/>
        </div>
      </div>
    </div>

    <LayerList show={["check_ap_modificaciones"]} settings={this.state.settings}/>


    </div>
    );
  }
}

export default AlumbradoPublico;
