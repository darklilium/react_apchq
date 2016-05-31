import cookieHandler from 'cookie-handler';
import APEditor from '../../../js/components/pstreetlights/AP_Editor.jsx';



function ap_showEditor(event){
  var elementMedidor = document.getElementById('wrapper_medidores');
  var elementLuminaria = document.getElementById('wrapper_luminarias');
  var elementLuminariaAsociada = document.getElementById('wrapper_luminariasAsociadas');

//  console.log("doing something",graphic);

  if ((elementMedidor.style.display=='none') && (elementLuminaria.style.display=='none') && (elementLuminariaAsociada.style.display=='none')){
    console.log("Esta apagado todo");
    $('.ap_wrapper-editor').css('visibility', 'visible').css('display','flex');
    //console.log(event.graphic.attributes);
    cookieHandler.set('crrntgrphc',event.graphic.attributes);


  }else{
    console.log("Esta prendido alguno tabla medidores");
    $('.ap_wrapper-editor').css('visibility', 'hidden').css('display','flex');

  }
}


export {ap_showEditor}