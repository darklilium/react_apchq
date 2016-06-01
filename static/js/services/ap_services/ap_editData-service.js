import cookieHandler from 'cookie-handler';
import APEditor from '../../../js/components/pstreetlights/AP_Editor.jsx';
import createQueryTask from '../../../js/services/createquerytask-service';
import layers from '../../../js/services/layers-service';


function ap_showEditor(event){
  var elementMedidor = document.getElementById('wrapper_medidores');
  var elementLuminaria = document.getElementById('wrapper_luminarias');
  var elementLuminariaAsociada = document.getElementById('wrapper_luminariasAsociadas');

//  console.log("doing something",graphic);

  if ((elementMedidor.style.display=='none') && (elementLuminaria.style.display=='none') && (elementLuminariaAsociada.style.display=='none')){
    console.log("Esta apagado todo");
    $('.ap_wrapper-editor').css('visibility', 'visible').css('display','flex');



    ap_getPics(event.graphic.attributes['ID_NODO'],event.graphic.attributes['COMUNA'] ,(callback)=>{
      ap_getPicsAttached(callback, (mySecondCallback)=>{
        let mysettings = {
          graphics:  event.graphic.attributes,
          pics: mySecondCallback
        };
        cookieHandler.set('crrntgrphc',mysettings);
        APEditor.layerClicked();
      });
    });

  }else{
    console.log("Esta prendido alguno tabla medidores");
    $('.ap_wrapper-editor').css('visibility', 'hidden').css('display','flex');

  }
}

function ap_getPics(idnodo,comuna,callback){
  var getOIDPicSrv = createQueryTask({
    url: layers.read_ap_catastro_fotos(),
    whereClause: "COMUNA='"+comuna + "' AND ID_NODO="+ idnodo
  });
  getOIDPicSrv((map, featureSet) => {
    if(!featureSet.features.length){
      console.log("no hay fotos");
      return callback('Sin Foto');
    }
    //if theres results then:
    let myOIDPerGetThePics = featureSet.features.map((feature)=>{
      return feature.attributes['OBJECTID'];
    });
    //  console.log(myOIDPerGetThePics[0]);
      callback(myOIDPerGetThePics[0]);

  },(errorPics)=>{
    console.log("Error getting the pics for this node",errorPics);
  });

}

function ap_getPicsAttached(idnodo, mySecondCallback){

  //ask about the number of pics and which ones are
  var myAttachedInfoLayer = new esri.layers.FeatureLayer(layers.read_ap_catastro_fotos());
  myAttachedInfoLayer.queryAttachmentInfos(idnodo,onResult,onFault);

  function onResult(eventArray,tokenObject){
    if (!eventArray.length){
      console.log("no hay pics para mostrar");
        mySecondCallback(eventArray);
    }else{
      console.log("hay", eventArray.length,"pics para mostrar");

        mySecondCallback(eventArray);
    }

  }
  function onFault(eventObject,tokenObject){
    console.log("Error getting the attached pics", eventObject);
    mySecondCallback([]);
  }


}
export {ap_showEditor}
