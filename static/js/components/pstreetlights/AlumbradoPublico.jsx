import React from 'react';
import mymap from '../../../js/services/map-service';
import APNavBar from '../pstreetlights/AP_Navbar.jsx';
import APSearch from '../pstreetlights/AP_Search.jsx';
import APEditor from '../pstreetlights/AP_Editor.jsx';
import APInfo from '../pstreetlights/AP_Info.jsx';


class AlumbradoPublico extends React.Component {

  constructor(props){
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onMedidor = this.onMedidor.bind(this);
    this.onLuminarias = this.onLuminarias.bind(this);
    this.onChangeMap = this.onChangeMap.bind(this);

    this.state ={
      onSearch: 0,
      onMedidor: 0,
      onLuminarias: 0,
      onChangeMap: 0
    };
  }

  componentDidMount(){
   var map = mymap.createMap("map_div","topo",-71.2905 ,-33.1009,9);


  }
  onSearch(){
    console.log("onsearch clicked");
    if (this.state.onSearch==0){
      this.setState({ onSearch : 1 });
      $('.ap__search_wrapper').css('visibility', 'visible');
      return;
    }
    this.setState({ onSearch : 0 });
    $('.ap__search_wrapper').css('visibility', 'hidden');

  }
  onMedidor(){
    console.log("onMedidor clicked");
  }
  onLuminarias(){
    console.log("onLuminarias clicked");
  }
  onChangeMap(){
    console.log("onChangeMap clicked");
  }

  render(){
    return (
    <div className="ap__wrapper">
    <div className="map_div" id="map_div"></div>
      <APNavBar onSearch={this.onSearch} onMedidor={this.onMedidor} onLuminarias={this.onLuminarias} onChangeMap={this.onChangeMap}/>
      <APSearch />
      <APEditor />
      <APInfo />
    </div>
    );
  }
}

export default AlumbradoPublico;
