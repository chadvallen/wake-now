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
      image_url: '',
      toggle: true
    }
  }



  render() {
    // let splitArr = this.props.location.pathname.split('');
    // console.log(splitArr)
    // if (splitArr.includes("1") || splitArr.includes("2") || splitArr.includes("3") || splitArr.includes("4") || splitArr.includes("5") || splitArr.includes("6") || splitArr.includes("7") || splitArr.includes("8") || splitArr.includes("9")) {
    //   this.setState({toggle: false})
    // } else {
      
    // }
    return (
      <div>
        <div>
        {console.log(this.state.toggle)}
          <div className="subheader">
            <NavLink to='/products/wakeboards'  style={{ textDecoration: 'none' }}>
                  <div  activeclassname="active"><p className="text">WAKEBOARDS</p></div>
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
        </div>
        
        {productRoutes}
        
      </div>
    )
  }
}



export default withRouter(Products);