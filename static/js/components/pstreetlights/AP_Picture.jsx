import React from 'react';

class APPicture extends React.Component {
  constructor(props){
    super(props);
    this.onClickEditor = this.onClickEditor.bind(this);
  }

  onClickEditor(){
    console.log("clicking button");
  }
  render(){
    return (
    <div className="ap__picture_wrapper">

      <div className="ap__picture_wrapper_top">
        <button className="ap__picture_button ap__picture_button-top btn btn-default" title="Ver Fotos" type="button" onClick={this.onClickEditor}>
          <span><i className="fa fa-chevron-left button-span"></i></span>
        </button>
         <h8 className="ap__picture-h8">1</h8>
         <h8 className="ap__picture-h8">de</h8>
         <h8 className="ap__picture-h8">2</h8>
        <button className="ap__picture_button ap__picture_button-top btn btn-default" title="Ver Fotos" type="button" onClick={this.onClickEditor}>
          <span><i className="fa fa-chevron-right button-span"></i></span>
        </button>
      </div>

      <div className="ap__picture_wrapper_mid">
          <img className="ap__picture-img"></img>
      </div>


        <div className="ap__picture_wrapper_bot">
            <button className="ap__picture_button ap__picture_button-bot btn btn-default" title="Actualizar" type="button" onClick={this.onClickEditor}>
              <span><i className="fa fa-undo"></i></span>
            </button>
            <button className="ap__picture_button ap__picture_button-bot btn btn-default" title="Eliminar" type="button" onClick={this.onClickEditor}>
              <span><i className="fa fa-repeat"></i></span>
            </button>
        </div>
    </div>
    );
  }
}

export default APPicture;
