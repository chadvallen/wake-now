import React, { Component } from 'react';
import logo from '../../media/white-logo.png';
import wake from '../../media/wake.png';
import now from '../../media/now.png';
import './Home.scss';

class Home extends Component {

  render() {
    
    return (
      <div className="width">
        <div className="parent-l">
        <img className ="wake" src={wake} />
        <img className="main-logo" src={logo} alt='logo'/>
        <img className="now" src={now} />
        </div>
      </div>
    )
  }
}


export default Home;