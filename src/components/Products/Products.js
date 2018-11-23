import React, { Component } from 'react'
import productRoutes from '../../productRoutes';
import { NavLink, withRouter } from 'react-router-dom';
import '../../App';


class Products extends Component {
  constructor() {
    super();
    this.state = {
      type: '',
      name: '',
      description: '',
      price: 0,
      image_url: ''
    }
  }



  render() {

    return (
      <div>
        <div>
          <div className="subheader">
            <NavLink to='/products/wakeboards'  style={{ textDecoration: 'none' }}>
              <div activeclassname="active"><p className="text">WAKEBOARDS</p></div>
            </NavLink>
            <NavLink to='/products/waterskis' style={{ textDecoration: 'none' }}>
              <div><p className="text">WATERSKIS</p></div>
            </NavLink>
            <NavLink to='/products/tubes' style={{ textDecoration: 'none' }}>
              <div><p className="text">TUBES</p></div>
            </NavLink>
            <NavLink to='/products/lifevests' style={{ textDecoration: 'none' }}>
              <div><p className="text">LIFE VESTS</p></div>
            </NavLink>
            <NavLink to='/products/accessories' style={{ textDecoration: 'none' }}>
              <div><p className="text">ACCESSORIES</p></div>
            </NavLink>
          </div>
        </div>
        
        {productRoutes}
        
      </div>
    )
  }
}



export default withRouter(Products);