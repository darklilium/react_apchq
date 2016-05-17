import {notifications} from '../utils/notifications';
import myLayers from './layers-service';
import token from '../services/token-service';
import createQueryTask from '../services/createquerytask-service';

import my_AP_Settings from '../services/ap_services/ap_settings-service';



function genericLogin(user, pass){
  const url = myLayers.read_tokenURL();

  const data = {
    username: user,
    password: pass,
    client: 'requestip',
    expiration: 10080,
    format: 'jsonp'
  };

  $.ajax({
    method: 'POST',
    url: url,
    data: data,
    dataType: 'html'
  })
  .done(myToken => {
    if(myToken.indexOf('Exception') >= 0) {
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    if (myToken.indexOf('error') >= 0){
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
  //  console.log(myToken);
    console.log('Requesting service access');
    console.log('Logging in to gisred-interruptions');
    console.log('writing token into system');
    token.write(myToken);

    const page = "REACT_INTERRUPCIONES_WEB";
    const module = "PO_INTERRUPCIONES";

    notifications("Logging in...","Login_Success", ".notification-login");
  //  window.location.href = "interrupciones.html";

    // saveLogin(user,page,module,myToken);
  })
  .fail(error => {
    console.log("You are not authorized ):");
    console.log(error);
    notifications("Acceso no autorizado.","Login_Failed", ".notification-login");
  });

  console.log('done');
}

function saveLogin(user,page,mod, tkn){

  const data = {
    f: 'json',
    adds: JSON.stringify([{ attributes: { "usuario": user, "pagina": page, "module": mod  }, geometry: {} }]),
    token: tkn
  };

  jQuery.ajax({
    method: 'POST',
    url: "http://gisred.chilquinta.cl:5555/arcgis/rest/services/Admin/LogAccesos/FeatureServer/1/applyedits",
    dataType:'html',
    data: data
  })
  .done(d =>{
    console.log(d,"pase");
  })
  .fail(f=>{
    console.log(f,"no pase")
  });
}

function muniLogin(user,pass){
  const url = myLayers.read_tokenURL();
  const genericUser = {
    user: 'vialactea\\ehernanr',
    pass: 'Chilquinta6'
  };
  const data = {
    username: genericUser.user,
    password: genericUser.pass,
    client: 'requestip',
    expiration: 1440,
    format: 'jsonp'
  };

  $.ajax({
    method: 'POST',
    url: url,
    data: data,
    dataType: 'html'
  })
  .done(myToken => {
    if(myToken.indexOf('Exception') >= 0) {
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }
    if (myToken.indexOf('error') >= 0){
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }

    console.log('Requesting service access');
    console.log('Logging in to gisred-ap');
    console.log('writing token into system');
    token.write(myToken);

    const page = "REACT_AP_WEB";
    const module = "AP_CHQ";

    notifications("Logging in...","Login_Success", ".notification-login");

    saveSettings(user);
    //window.location.href = "apchq.html";

    // saveLogin(user,page,module,myToken);
  })
  .fail(error => {
    console.log("You are not authorized ):");
    console.log(error);
    notifications("Acceso no autorizado.","Login_Failed", ".notification-login");
  });

  console.log('done');
}

function saveSettings(user){
  var getUserAccountSettings = createQueryTask({
    url: myLayers.read_logAccess(),
    whereClause: "usuario = '"+ user+ "'",
    returnGeometry: false
  });

  getUserAccountSettings((map,featureSet) =>{
    console.log(featureSet.features[0].attributes.usuario);
  /*  let regionExtent = regionsExtent.filter(region =>{
      return region =  featureSet.features[0].attributes.widget;

    });
    */
    console.log(Array.from(regionsExtent()));
    my_AP_Settings.write(featureSet.features[0].attributes.usuario,featureSet.features[0].attributes.widget,"elextent");


    console.log(my_AP_Settings.read());
  },(error)=>{
    console.log("Error getting the user settings");
  });


}

function regionsExtent(){

  return [{
      comuna: "LA CRUZ",
      extent: '-7944729.9248 -3881855.6720 -7917556.5613 -3863529.8944'
    },
    {
      comuna: "VALPARAISO",
      extent: '-7995553.4815 -3930687.1962 -7941206.7543 -3894035.6412'
    }];
    /*"PUTAENDO": "-7907605.0085 -3867646.1325 -7798911.5543 -3794343.0224",
    /*"LIMACHE": "-7961230.7081 -3919312.2885 -7906883.9810 -3882660.7335",
    "OLMUE" : "-7943352.0872 -3919736.5140 -7889005.3601 -3883084.9590",
    "VIÑA DEL MAR" : "-7987587.2759 -3918920.7732 -7933240.5487 -3882269.2181",
    "VALPARAISO": "-7995553.4815 -3930687.1962 -7941206.7543 -3894035.6412",
    "CASABLANCA": "-8008591.4934 -3975165.6586 -7899898.0392 -3901862.5485",
    "ALGARROBO": "-7999732.9632 -3958974.4295 -7945386.2361 -3922322.8745",
    "EL QUISCO  ": "-7989529.2591 -3960828.6637 -7962355.8956 -3942502.8862",
    "EL TABO": "-7982139.7094 -3969151.7007 -7954966.3459 -3950825.9231",
    "CARTAGENA": "-7985028.3270 -3986601.6668 -7930681.5999 -3949950.1117",
    "SAN ANTONIO": "-7986729.0508 -4004988.5939 -7932382.3237 -3968337.0389",
    "LA LIGUA": "-7992541.8343 -3850157.3404 -7883848.3801 -3776854.2303",
    "PAPUDO": "-7974371.2540 -3846392.1235 -7920024.5269 -3809740.5685",
    "ZAPALLAR": "-7968546.9376 -3859451.0987 -7914200.2105 -3822799.5437",
    "PUCHUNCAVI": "-7975439.9628 -3881235.8580 -7921093.2357 -3844584.3029",
    "QUINTERO": "-7984016.1973 -3893932.0484 -7929669.4702 -3857280.4933",
    "NOGALES": "-7950041.1832 -3874198.8385 -7895694.4561 -3837547.2834",
    "PETORCA": "-7943790.2977 -3828158.7637 -7835096.8435 -3754855.6536",
    "CABILDO": "-7937503.3521 -3854571.5788 -7828809.8979 -3781268.4687",
    "CONCON": "-7969688.5902 -3898492.9773 -7942515.2267 -3880167.1998",
    "QUILLOTA": "-7962965.0653 -3902263.3416 -7908618.3382 -3865611.7865",
    */
    //"LA CRUZ": "-7944729.9248 -3881855.6720 -7917556.5613 -3863529.8944"
    /*
    "LA CALERA": "-7933973.3081 -3878566.2947 -7906799.9445 -3860240.5172",
    "HIJUELAS": "-7939918.1980 -3895893.6136 -7885571.4708 -3859242.0585",
    "LLAY LLAY": "-7919872.2162 -3899413.4279 -7865525.4890 -3862761.8728",
    "RINCONADA": "-7897439.7123 -3898948.9722 -7843092.9852 -3862297.4171",
    "PANQUEHUE": "-7899523.5768 -3877249.4553 -7872350.2132 -3858923.6778",
    "CATEMU": "-7926769.9299 -3876788.1428 -7872423.2028 -3840136.5877",
    "SAN FELIPE": "-7902366.0788 -3880093.8682 -7848019.3517 -3843442.3131",
    "SANTA MARIA": "-7886612.4072 -3874743.2762 -7832265.6801 -3838091.7212",
    "SAN ESTEBAN": "-7886626.8661 -3890240.9181 -7777933.4119 -3816937.8079",
    "LOS ANDES": "-7882213.5044 -3926784.5121 -7773520.0501 -3853481.4020",
    "CALLE LARGA": "-7879928.8091 -3907349.5478 -7825582.0820 -3870697.9927" ,
    "QUILPUE": "-7986679.4029 -3951387.6126 -7877985.9487 -3878084.5024",
    "SANTO DOMINGO": "-8034802.2089 -4037095.9677 -7926108.7546 -3963792.8575" ,
    "VILLA ALEMANA": "-7955529.9187 -3913824.4735 -7928356.5552 -3895498.6960"
    */


}
export { genericLogin, muniLogin };
