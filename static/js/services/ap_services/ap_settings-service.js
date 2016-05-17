function my_AP_Settings(){
  var my_ap_settings = {
    logo: '',
    comuna: '',
    extent: ''
  };
  return {

    read(){
      return my_ap_settings;
    },
    write(logo,comuna,extent){
      my_ap_settings = {
        logo: logo,
        comuna: comuna,
        extent: extent
      };
    }
  };
}


export default my_AP_Settings();
