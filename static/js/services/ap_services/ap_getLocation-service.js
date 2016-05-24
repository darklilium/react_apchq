import my_AP_Settings from '../../../js/services/ap_services/ap_settings-service';
import createQueryTask from '../../../js/services/createquerytask-service';
import layers from '../../../js/services/layers-service';
import mymap from '../../../js/services/map-service';
import makeSymbol from '../../../js/utils/makeSymbol';

function ap_getMedidorLocation(idmedidor) {
  let mySymbol = makeSymbol.makeLine();
    var medidorLocationSrv = createQueryTask({
      url: layers.read_ap_equipos(),
      whereClause: "id_medidor="+idmedidor
    });

    medidorLocationSrv((map, featureSet) => {

      var myLineSymbol = makeSymbol.makeLine();
      map.graphics.add(new esri.Graphic(featureSet.features[0].geometry,myLineSymbol));
      map.centerAndZoom(featureSet.features[0].geometry.getExtent().getCenter(),20);

    },(errorQuery)=>{
        console.log("Error performing query for ap_getDataMedidores", errorQuery);
    });

}

function ap_getLuminariaLocation(idLuminaria) {
  let mySymbol = makeSymbol.makePoint();
    var luminariaLocationSrv = createQueryTask({
      url: layers.read_ap_luminarias(),
      whereClause: "ID_LUMINARIA="+idLuminaria
    });

    luminariaLocationSrv((map, featureSet) => {
      map.graphics.add(new esri.Graphic(featureSet.features[0].geometry,mySymbol));
      map.centerAndZoom(featureSet.features[0].geometry,20);

    },(errorQuery)=>{
        console.log("Error performing query for ap_getDataMedidores", errorQuery);
    });

}

export {ap_getMedidorLocation, ap_getLuminariaLocation}
