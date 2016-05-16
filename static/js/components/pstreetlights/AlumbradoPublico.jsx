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
  }
  onSearch(){
    console.log("onsearch clicked");
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
      <APNavBar onSearch={this.onSearch} onMedidor={this.onMedidor} onLuminarias={this.onLuminarias} onChangeMap={this.onChangeMap}/>
      <APSearch />
      <APEditor />
    </div>
    );
  }
}

export default AlumbradoPublico;
