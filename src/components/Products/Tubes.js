import React, { Component } from 'react'
import '../../App';
import { Link } from 'react-router-dom';
import MyHOC from './MyHOC';

class Tubes extends Component {
  render() {
    let tubesList = this.props.data.map(item => {
      return (
        <div className="product-child" key={item.id}>
          <Link to={`/products/${item.type}/${item.id}`} style={{ textDecoration: 'none' }}>
            <img src={item.image_url} alt={item.title} className="product-img" />
            <h5>{item.name}</h5>
            <p>${item.price}</p>
          </Link>
        </div>
      )
    })
    return (
      <div>
        <h1 className="product-title">TUBES</h1>
        <div className="product-parent">
        {tubesList}
        </div>
      </div>
    )
  }
}

export default MyHOC(Tubes, '/api/products/tubes')