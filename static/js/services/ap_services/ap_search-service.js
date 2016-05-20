import createQueryTask from '../../../js/services/createquerytask-service';
import layers from '../../../js/services/layers-service';
import {notifications} from '../../../js/utils/notifications';
import {ap_infoWindow_rotulo} from '../../../js/utils/makeInfoWindow';
import makeSymbol from '../../../js/utils/makeSymbol';

function ap_search_service(type, value, region){
  let pointSymbol = makeSymbol.makePoint();
  $('.ap_search_notifications').empty().css('visibility', 'hidden');


  if (type=="ROTULO"){
    var rotuloService = createQueryTask({
      url: layers.read_ap_rotulos(),
      whereClause: "comuna='"+region + "' AND rotulo='"+ value+"'"
    });
    rotuloService((map, featureSet) => {
      if(!featureSet.features.length){
        console.log("no hay");
        $('.ap_search_notifications').empty().css('visibility', 'visible');
        let message = "Rótulo no encontrado en la comuna";
        notifications(message, "AP_ROTULO_NOTFOUND", ".ap_search_notifications");
        return;
      }
      //if theres results then:
      let myresults = featureSet.features.map((feature)=>{
        return feature;
      });
      myresults.forEach((attribute)=>{
        map.graphics.add(new esri.Graphic(attribute.geometry,pointSymbol));
        map.centerAndZoom(attribute.geometry,20);
      });

    },(errorRotulo)=>{
      $('.ap_search_notifications').empty().css('visibility', 'visible');

      let message = "Rótulo no encontrado";
      notifications(message, "AP_ROTULO_NOTFOUND", ".ap_search_notifications");
    });
  }else{
    //console.log(type);
    //FOR ID_NODO
    var nodoService = createQueryTask({
      url: layers.read_ap_rotulos(),
      whereClause: `id_nodo=${value}`
    });
    nodoService((map, featureSet) => {
      if(!featureSet.features.length){
        console.log("no hay");
        $('.ap_search_notifications').empty().css('visibility', 'visible');
        let message = "ID Nodo no encontrado en la comuna";
        notifications(message, "AP_ROTULO_NOTFOUND", ".ap_search_notifications");
        return;
      }

      //if theres results then:
      let myresults = featureSet.features.map((feature)=>{
        return feature;
      });
      myresults.forEach((attribute)=>{
        map.graphics.add(new esri.Graphic(attribute.geometry,pointSymbol));
        map.centerAndZoom(attribute.geometry,20);
      });
          
    },(errorRotulo)=>{
      console.log("Nodo no encontrado");
    });
  }



}

export {ap_search_service}
