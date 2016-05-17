import React from 'react';
import { genericLogin } from '../services/login-service';
import {notifications} from '../utils/notifications';
import { muniLogin } from '../services/login-service';

class LoginApp extends React.Component {
  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount(){
    //change the loginwall dinamically
    let randomPicNumber = Math.floor((Math.random() * 8) + 1);
    //********Cambiar randomPicSrc para test/prod*******
    //let randomPicSrc = "css/images/login_images/loginwall"+ randomPicNumber+ ".jpg"; //prod
    let randomPicSrc = "static/css/images/login_images/ap_images/apwall"+ randomPicNumber+ ".jpg";//desarrollo
    $('.login_wrapper').css("background-image", "url("+randomPicSrc+")");
  }

  onClick(){

    var userValue = this.refs.username.value;
    var passValue = this.refs.password.value;

    if (userValue=="" || passValue==""){
      notifications('Login incorrecto, intente nuevamente.', 'Login_Error', '.notification-login');
      return;
    }

    if (userValue.includes('vialactea\\')){
      console.log("Trying to access REACT_PO_WEB");
      genericLogin(userValue, passValue);
      return;

    }if(userValue.includes('muni')){
      console.log("Trying to access REACT_AP_WEB");
      muniLogin(userValue, passValue);
      return;

    } else {
      console.log("Trying to access REACT_PO_WEB");
      userValue =  'vialactea\\'+this.refs.username.value;
      genericLogin(userValue, passValue);

    }


  }

  render(){
    return (
        <div className="login_wrapper_content">
          <article className="login_article">
            <input className="login__input" ref="username" type="text" placeholder="miusuario" defaultValue="munilacruz" />
            <input className="login__input" ref="password" type="password" placeholder="password" defaultValue="123123"/>
            <input className="login__submit" type="submit" onClick={this.onClick} defaultValue="Entrar" />

          </article>
          <aside className="login_aside">
              <div className="aside_div">
                <img className="login_aside__img" />
                <h1 className="login_aside__h1"> Bienvenidos a GISRED AP</h1>
              </div>
              <div className="aside_div2">
                <p className="login_aside__p">Visualización del alumbrado público de las municipalidades.<br />
                Búsquedas de postes, clientes y medidores.<br />
                La información contenida en este sitio se obtiene del sistema Smallworld y catastro</p>
              </div>
          </aside>
        </div>



    );
  }
}

export default LoginApp;
