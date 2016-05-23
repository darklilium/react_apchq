import React from 'react';
import mymap from '../../../js/services/map-service';
import APNavBar from '../pstreetlights/AP_Navbar.jsx';
import APSearch from '../pstreetlights/AP_Search.jsx';
import APEditor from '../pstreetlights/AP_Editor.jsx';
import APInfo from '../pstreetlights/AP_Info.jsx';
import LayerList from '../../../js/components/LayerList.jsx';
import my_AP_Settings from '../../../js/services/ap_services/ap_settings-service';
import {addCertainLayer} from '../../../js/services/layers-service';
import {layersActivated} from '../../../js/services/layers-service';
import {ap_getDataMedidores} from '../../../js/services/ap_services/ap_getData-service';
import {ap_getDataLumPerMed} from '../../../js/services/ap_services/ap_getData-service';

class AlumbradoPublico extends React.Component {

  constructor(props){
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onMedidor = this.onMedidor.bind(this);
    this.onLuminarias = this.onLuminarias.bind(this);
    this.onChangeMap = this.onChangeMap.bind(this);
    this.onClearMap = this.onClearMap.bind(this);

    this.state ={
      onSearch: 0,
      onMedidor: 0,
      onLuminarias: 0,
      onAsociadas: 0,
      onChangeMap: 0,
      columnsMedidores: [],
      dataMedidores: [],
      columnsLuminarias: [],
      dataLuminarias: [],
      settings: [],
      mapClick : 0

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
    addCertainLayer("ap_luminarias", 11, "COMUNA='"+this.state.settings.comuna+"'");

    ap_getDataMedidores(this.state.settings.comuna,(callback)=>{
      this.setState({dataMedidores:callback });
    });
  }

  onSearch(){
    console.log("onsearch clicked");
    if (this.state.onSearch==0){
      this.setState({ onSearch : 1 });
      $('.ap__search_wrapper').css('visibility', 'visible');
      return;
    }
    this.setState({ onSearch : 0 });
    $('.ap__search_wrapper').css('visibility', 'hidden');
    $('.ap_search_notifications').empty().css('visibility', 'hidden');
  }

  onMedidor(){
    //visibility logic
    /*
    if onmedidor is clicked
      see onMedidor
        if onLuminaria is not visible
          set flex-direction to column
        if onluminaria is visible
          set flex-direction to column-reverse



    else
      hide onmedidor
    */
    var that = this;
    this.setState({columnsMedidores: ['ID EQUIPO', 'NIS', 'CANT LUMINARIAS', 'CANT TRAMOS', 'TIPO', 'ROTULO'] });


    console.log("onMedidor clicked");

    $('.ap__info_wrapper-medidores').css('display', 'flex');
    $('.ap__info_wrapper-luminariasAsociadas').css('display', 'none');

    if (this.state.onMedidor == 0){
      this.setState({onMedidor: 1})
      console.log("onMedidor prendido");
      $('.ap__info_wrapper-medidores').css('visibility', 'visible');

        if(this.state.onLuminarias==0){
          console.log("onlum apagado");
          $('.ap__wrapper-tables').css('flex-direction', 'column');
          $('.ap__info_wrapper-luminarias').css('display', 'none');
        }else{
            console.log("onlum visible");
            $('.ap__wrapper-tables').css('flex-direction', 'column-reverse');
        }

    }else{
      this.setState({onMedidor: 0})
      $('.ap__info_wrapper-medidores').css('visibility', 'hidden');
    }
  }

  onLuminarias(){
    console.log("onLuminarias clicked");
    $('.ap__info_wrapper-luminariasAsociadas').css('display', 'none');
    $('.ap__info_wrapper-luminarias').css('display', 'flex');


    if (this.state.onLuminarias == 0){
      this.setState({onLuminarias: 1});
      console.log("onLuminarias prendido");
      $('.ap__info_wrapper-luminarias').css('visibility', 'visible');

        if(this.state.onMedidor==0){
          console.log("onMedidor esta apagado");
          $('.ap__wrapper-tables').css('flex-direction', 'column');
          $('.ap__info_wrapper-medidores').css('display', 'none');

        }else{
          console.log("onMedidor visible");
          $('.ap__wrapper-tables').css('flex-direction', 'column-reverse');
        }

          this.setState({
            columnsLuminarias: ["ID LUMINARIA", "TIPO CONEXIÓN", "PROPIEDAD", "MEDIDO", "DESCRIPCIÓN", "ROTULO"],
            dataLuminarias: [{
              "ID LUMINARIA": "292246599",
              "TIPO CONEXIÓN": "Directo a Red BT",
              "PROPIEDAD": "Municipal",
              "MEDIDO": "False",
              "DESCRIPCIÓN": "Luminaria 70(w) NA",
              "ROTULO": "309057"
              }]
            });

    }else{
        this.setState({onLuminarias: 0});
      $('.ap__info_wrapper-luminarias').css('visibility', 'hidden');
    }


  }

  onChangeMap(){
    console.log("onChangeMap clicked");
    var myActiveLayers = layersActivated().getMapLayers();
    console.log("mis layers",myActiveLayers);
      var mapp = mymap.getMap();

      if (this.state.mapClick==0){
        this.setState({ mapClick : 1 });
        mymap.changeBasemap("hybrid");
        addCertainLayer("ap_comuna", 11, "nombre='"+this.state.settings.comuna+"'");
        addCertainLayer("ap_luminarias", 11, "COMUNA='"+this.state.settings.comuna+"'");

      }else if(this.state.mapClick==1){
        this.setState({ mapClick : 2 });
        mymap.changeBasemap("Chilquinta");
        addCertainLayer("ap_comuna", 11, "nombre='"+this.state.settings.comuna+"'");
        addCertainLayer("ap_luminarias", 11, "COMUNA='"+this.state.settings.comuna+"'");

      }else {
        this.setState({ mapClick : 0 });
        mymap.changeBasemap("topo");
        addCertainLayer("ap_comuna", 11, "nombre='"+this.state.settings.comuna+"'");
        addCertainLayer("ap_luminarias", 11, "COMUNA='"+this.state.settings.comuna+"'");
      }
  }

  onClearMap(){
    console.log("clearing map");
    var map = mymap.getMap();
    map.graphics.clear();
    $('.ap_search_notifications').empty().css('visibility', 'hidden');
  }
  render(){




    let region = this.state.settings.comuna;
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
      <div className="ap__info_wrapper-medidores">
        <APInfo title={"Medidores"} columns={this.state.columnsMedidores} data={this.state.dataMedidores}/>
      </div>
      <div className="ap__info_wrapper-luminariasAsociadas">
        <APInfo title={"Luminarias Asociadas"} columns={this.state.columnsMedidores} data={this.state.dataMedidores}/>
      </div>
      <div className="ap__info_wrapper-luminarias">
        <APInfo title={"Luminarias"} columns={this.state.columnsLuminarias} data={this.state.dataLuminarias}/>
      </div>
    </div>

    <LayerList show={["check_ap_modificaciones"]} settings={this.state.settings}/>


    </div>
    );
  }
}

export default AlumbradoPublico;
