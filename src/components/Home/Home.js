import React, { Component } from 'react'
import logo from '../../media/drop.png';
import './Home.css';

class Home extends Component {

  render() {
    
    return (
      <div>
        <h1 className="title">WAKE NOW</h1>
        <img className="main-logo" src={logo} alt='logo'/>
        <br></br>
       
      </div>
    )
  }
}


export default Home;