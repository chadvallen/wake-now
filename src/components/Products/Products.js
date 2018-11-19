import React, { Component } from 'react'
import productRoutes from '../../productRoutes';
import { NavLink } from 'react-router-dom';
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
        <div className="subheader">
        <NavLink to='/products/wakeboards'  style={{ textDecoration: 'none' }}>
              <div  activeClassName="active"><p className="text">WAKEBOARDS</p></div>
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
        </div>
        
        {productRoutes}
        
      </div>
    )
  }
}



export default Products;