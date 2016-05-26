import my_AP_Settings from '../../../js/services/ap_services/ap_settings-service';
import createQueryTask from '../../../js/services/createquerytask-service';
import layers from '../../../js/services/layers-service';
import makeSymbol from '../../../js/utils/makeSymbol';

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
          "ROTULO": result.attributes['ROTULO']
        };
        return children;
      });

      callback(finalResults);

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
//dibujar los tramos aqui

      featureSet.features.forEach(feature =>{
        map.graphics.add(new esri.Graphic(feature.geometry,mySymbol));

      });
      var myExtend= new esri.graphicsExtent(featureSet.features);
      map.setExtent(myExtend,true);
  },(errorQuery)=>{
      console.log("Error performing query for ap_getDataMedidores", errorQuery);
  });
}

function ap_getTramosLuminaria(){

}
export {ap_getDataMedidores, ap_getDataLuminarias,ap_getTramosMedidor,ap_getTramosLuminaria};
