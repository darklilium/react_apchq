import {notifications} from '../utils/notifications';
import myLayers from './layers-service';
import token from '../services/token-service';
import createQueryTask from '../services/createquerytask-service';
import {regionsExtent} from '../services/ap_services/regionsExtent-service';
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
      let myRegion = regionsExtent().filter(region =>{
      return region[0] ==  featureSet.features[0].attributes.widget;
    });
    //logo,comuna,latx,laty,zoom
    my_AP_Settings.write(
      featureSet.features[0].attributes.usuario, //logo
      featureSet.features[0].attributes.widget, //region
      myRegion[0][1], //latx
      myRegion[0][2], //laty
      myRegion[0][3]); //zoom

    
    window.location.href = "apchq.html";
  },(error)=>{
    console.log("Error getting the user settings");
  });
}


export { genericLogin, muniLogin };
