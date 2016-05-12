import React from 'react';

//import mymap from '../../../js/services/map-service';

class APSearch extends React.Component {
  constructor(props){
    super(props);
    this.onClickSearch = this.onClickSearch.bind(this);
  }

  onClickSearch(){
    console.log("clicking button");
  }
  render(){
    return (
    <div className="ap__search_wrapper">
      <div className="ap__search_wrapper_elements">
        <select className="ap__search-combobox" title="Elija una opción de búsqueda" ref="searchType">
          <option value="ROTULO">ROTULO</option>
          <option value="IDNODO">ID NODO</option>
        </select>
        <input className="ap__search-input" ref="searchValue" title="Ingrese Rotulo o ID nodo a buscar" type="text" placeholder="" />
        <button className="ap_navbar_button btn btn-default" title="Buscar" type="button" onClick={this.onClickSearch}>
            <span><i className="fa fa-search"></i></span>
        </button>
      </div>    
    </div>
    );
  }
}

export default APSearch;
