import React from 'react';
import mymap from '../../../js/services/map-service';
import APNavBar from '../pstreetlights/AP_Navbar.jsx';
import APSearch from '../pstreetlights/AP_Search.jsx';

class AlumbradoPublico extends React.Component {
  render(){
    return (
    <div className="ap__wrapper">
      <APNavBar />
      <APSearch />
    </div>
    );
  }
}

export default AlumbradoPublico;
