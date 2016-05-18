import cookieHandler from 'cookie-handler';
function my_AP_Settings(){
  var my_ap_settings = {
    logo: '',
    comuna: '',
    latx: '',
    laty: '',
    zoom: ''
  };
  return {

    read(){
      return cookieHandler.get('sttngs');
    },

    write(logo,comuna,latx,laty,zoom){
      my_ap_settings = {
        logo: logo,
        comuna: comuna,
        latx: latx,
        laty: laty,
        zoom: zoom
      };
      cookieHandler.set('sttngs',my_ap_settings);

    },
    delete(){
      cookieHandler.remove('sttngs');
    }
  };
}


export default my_AP_Settings();
