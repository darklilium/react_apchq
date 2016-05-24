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

      var lineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255,0,0,0.5]),3);
      //map.graphics.add(new esri.Graphic(featureSet.features.geometry,mySymbol));
      var graphic = new esri.Graphic(featureSet.features.geometry, lineSymbol);
      map.graphics.add(graphic);

    //  map.zoomTo(featureSet.features[0].geometry);


/*
        var line = new esri.geometry.Polyline(map.spatialReference);
          line.addPath([point1, point2]);
            var lineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255,0,0,0.5]),3);

                       map.graphics.add(new esri.Graphic(line, lineSymbol))

*/
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
