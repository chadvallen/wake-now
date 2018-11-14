import React, { Component } from 'react';
import axios from 'axios';
import '../../App';
import { Link } from 'react-router-dom';
import MyHOC from './MyHOC';

class Waterskis extends Component {

  render() {
    let waterskiList = this.props.data.map(item => {
      return (
        <div className="product-child" key={item.id}>
          <Link to={`/products/${item.type}/${item.id}`} style={{ textDecoration: 'none' }}>
            <img src={item.image_url} alt={item.title} className="product-img"/>
            <h5>{item.name}</h5>
            <p>${item.price}</p>
          </Link>
        </div>
      )
    })
    return (
      <div>
        <h1 className="product-title">WATERSKIS</h1>
        <div className="product-parent">
        {waterskiList}
        </div>
      </div>
    )
  }
}

export default MyHOC(Waterskis, '/api/products/waterskis')