import my_AP_Settings from '../../../js/services/ap_services/ap_settings-service';
import createQueryTask from '../../../js/services/createquerytask-service';
import layers from '../../../js/services/layers-service';

/*
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
        ap_getDataLumPerMed(comuna, result.attributes['id_medidor'],(callback)=>{
            mr.children = callback;
        });

      //  console.log(ap_getDataLumPerMed(comuna, result.attributes['id_medidor']));
        return mr;
      });
      callback(finalResults);

  },(errorQuery)=>{
      console.log("Error performing query for ap_getDataMedidores", errorQuery);
  });



}
*/
/*
function ap_getDataLumPerMed(comuna,idmed, callback) {
    var dataLumPerMedSrv = createQueryTask({
      url: layers.read_ap_luminarias(),
      whereClause: "comuna='"+comuna + "' AND ID_EQUIPO_AP="+idmed
    });

    return dataLumPerMedSrv((map, featureSet) => {

        let finalResults = featureSet.features.map((result, index)=>{

          let children = {
            "ID EQUIPO": "ID Luminaria: " + result.attributes['ID_LUMINARIA'],
            "NIS": "Tipo Conexión: " + result.attributes['TIPO_CONEXION'],
            "CANT LUMINARIAS": "Propiedad: " + result.attributes['PROPIEDAD'],
            "CANT TRAMOS": "Medido: " + result.attributes['MEDIDO_TERRENO'],
            "TIPO": "Descripción: " + result.attributes['DESCRIPCION'],
            "ROTULO": "Rótulo: " + result.attributes['ROTULO']
          };


          return children;
        });
        //console.log(finalResults);
      callback(finalResults);

    },(errorQuery)=>{
        console.log("Error performing query for ap_getDataMedidores", errorQuery);
    });

}
*/

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
export {ap_getDataMedidores, ap_getDataLuminarias};
