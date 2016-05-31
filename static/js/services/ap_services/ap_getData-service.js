import my_AP_Settings from '../../../js/services/ap_services/ap_settings-service';
import createQueryTask from '../../../js/services/createquerytask-service';
import layers from '../../../js/services/layers-service';
import makeSymbol from '../../../js/utils/makeSymbol';
import {addCertainLayer} from '../../../js/services/layers-service';
import mymap from '../../../js/services/map-service';
import {ap_infoWindow} from '../../../js/utils/makeInfoWindow';

function ap_getDataMedidores(comuna,callback) {
  var dataMedidoresSrv = createQueryTask({
    url: layers.read_ap_equipos(),
    whereClause: "comuna='"+comuna + "'"
  });

  dataMedidoresSrv((map, featureSet) => {

      let finalResults = featureSet.features.map((result)=>{
        let mr = {
          "ID EQUIPO": result.attributes['id_medidor'],
          "NIS": result.attributes['nis'],
          "CANT LUMINARIAS": result.attributes['luminarias'],
          "CANT TRAMOS": result.attributes['tramos_ap'],
          "TIPO": result.attributes['tipo_conexion'],
          "ROTULO": result.attributes['rotulo']

        }
        return mr;
      });
      callback(finalResults);

  },(errorQuery)=>{
      console.log("Error performing query for ap_getDataMedidores", errorQuery);
  });

}

function ap_getDataLuminarias(comuna,callback){
  var dataLuminariasSrv = createQueryTask({
    url: layers.read_ap_luminarias(),
    whereClause: "comuna='"+comuna + "'"
  });

  dataLuminariasSrv((map, featureSet) => {

      let finalResults = featureSet.features.map((result, index)=>{

        let children = {
          "ID LUMINARIA":  result.attributes['ID_LUMINARIA'],
          "TIPO CONEXIÓN": result.attributes['TIPO_CONEXION'],
          "PROPIEDAD": result.attributes['PROPIEDAD'],
          "MEDIDO": result.attributes['MEDIDO_TERRENO'],
          "DESCRIPCION": result.attributes['DESCRIPCION'],
          "ROTULO": result.attributes['ROTULO'],
          "ID EQUIPO": result.attributes['ID_EQUIPO_AP']
        };
        return children;
      });

      callback(finalResults);

  },(errorQuery)=>{
      console.log("Error performing query for ap_getDataMedidores", errorQuery);
  });
}

function ap_getDataLuminariasAsociadas(comuna, idMedidor,callback){


  let mySymbol = makeSymbol.makePoint();
  let graphicsLayer= new esri.layers.GraphicsLayer();

  var dataLuminariasAsocSrv = createQueryTask({
    url: layers.read_ap_luminarias(),
    whereClause: "comuna='"+comuna + "' AND ID_EQUIPO_AP="+idMedidor
  });

  dataLuminariasAsocSrv((map, featureSet) => {

      let finalResults = featureSet.features.map((result, index)=>{

        let children = {
          "ID LUMINARIA":  result.attributes['ID_LUMINARIA'],
          "TIPO CONEXIÓN": result.attributes['TIPO_CONEXION'],
          "PROPIEDAD": result.attributes['PROPIEDAD'],
          "MEDIDO": result.attributes['MEDIDO_TERRENO'],
          "DESCRIPCION": result.attributes['DESCRIPCION'],
          "ROTULO": result.attributes['ROTULO']
        };
          //draw the points
          var g = new esri.Graphic(featureSet.features[index].geometry,mySymbol,children);

          graphicsLayer.add(g);

        return children;
      });


      //map.graphics.add(g);
      map.addLayer(graphicsLayer,9);
      let results = {
        featureSet: featureSet,
        dataForTable: finalResults
      };

      graphicsLayer.on('mouse-over',(event)=>{
          console.log("seeing the graphic here.");
          ap_infoWindow(event.graphic.attributes['ID LUMINARIA'],
            event.graphic.attributes['ROTULO'],
            event.graphic.attributes['TIPO CONEXIÓN'],
            event.graphic.attributes['DESCRIPCION'],
            event.graphic.attributes['PROPIEDAD'],
            event.graphic.attributes['MEDIDO'],
            event.graphic.geometry);
      });
      layers.save_graphicLayer(graphicsLayer);
      var myExtend= new esri.graphicsExtent(featureSet.features);
      map.setExtent(myExtend,true);
      callback(results);

  },(errorQuery)=>{
      console.log("Error performing query for ap_getDataMedidores", errorQuery);
  });



}

function ap_getTramosMedidor(idequipoap, comuna){
  let mySymbol = makeSymbol.makeTrackLine();

  var dataLuminariasSrv = createQueryTask({
    url: layers.read_ap_tramos(),
    whereClause: "comuna='"+ comuna + "' AND id_equipo_ap=" + idequipoap
  });

  dataLuminariasSrv((map, featureSet) => {
      featureSet.features.forEach(feature =>{
        map.graphics.add(new esri.Graphic(feature.geometry,mySymbol));

      });
      var myExtend= new esri.graphicsExtent(featureSet.features);
      map.setExtent(myExtend,true);
  },(errorQuery)=>{
      console.log("Error performing query for ap_getDataMedidores", errorQuery);
  });
}

function ap_getTramosLuminaria(idLuminariaap, comuna){
  let mySymbol = makeSymbol.makeTrackLine();

  var dataLuminariasSrv = createQueryTask({
    url: layers.read_ap_tramos(),
    whereClause: "comuna='"+ comuna + "' AND id_equipo_ap=" + idLuminariaap
  });

  dataLuminariasSrv((map, featureSet) => {
      featureSet.features.forEach(feature =>{
        map.graphics.add(new esri.Graphic(feature.geometry,mySymbol));

      });
      var myExtend= new esri.graphicsExtent(featureSet.features);
      map.setExtent(myExtend,true);
  },(errorQuery)=>{
      console.log("Error performing query for ap_getDataMedidores", errorQuery);
  });
}
export {ap_getDataMedidores, ap_getDataLuminarias,ap_getTramosMedidor,ap_getTramosLuminaria,ap_getDataLuminariasAsociadas};
