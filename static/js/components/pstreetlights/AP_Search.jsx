import React from 'react';
import {ap_search_service} from '../../../js/services/ap_services/ap_search-service';
import {notifications} from '../../../js/utils/notifications';
import mymap from '../../../js/services/map-service';

class APSearch extends React.Component {
  constructor(props){
    super(props);
    //this.onClickSearch = this.onClickSearch.bind(this);
    this.onClickClear = this.onClickClear.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onClickClear(){
    console.log("clearing search");
      var map = mymap.getMap();
      map.graphics.clear();
      this.refs.searchValue.value="";
  }

  handleChange(e){
    if(e.key =='Enter'){
      console.log("do search");
      console.log("clicking button");
      if (!this.refs.searchValue.value){
        $('.ap_search_notifications').empty().css('visibility', 'visible');
        let message = "Ingrese un valor";
        notifications(message, "AP_ROTULO_VALUENOTFOUND", ".ap_search_notifications");
        return;
      }
      ap_search_service(this.refs.searchType.value, this.refs.searchValue.value, this.props.region);
    }
  }
  render(){
    return (
    <div className="ap__search_wrapper">

        <div className="ap__search_wrapper_elements">
          <select className="ap__search-combobox" title="Elija una opción de búsqueda" ref="searchType">
            <option value="ROTULO">ROTULO</option>
            <option value="IDNODO">ID NODO</option>
          </select>
          <input className="ap__search-input" ref="searchValue" onKeyPress={this.handleChange} title="Ingrese Rotulo o ID nodo a buscar" type="text" placeholder="" />

          <button className="ap_navbar_button btn btn-default" title="Buscar" type="button" onClick={this.onClickClear}>
              <span><i className="fa fa-eraser"></i></span>
          </button>
        </div>
    </div>
    );
  }
}

export default APSearch;
