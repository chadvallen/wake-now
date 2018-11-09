import React, { Component } from 'react';
import axios from 'axios';
import '../../../App';
import { Link } from 'react-router-dom';

export default class Wakeboards extends Component {
  constructor() {
    super();
    this.state = {
      wakeboards: []
    }
  }

  componentDidMount() {
    this.displayWakeboards()
  }

  displayWakeboards = () => {
    axios.get('/api/products/wakeboards').then(res => {
      this.setState({wakeboards: res.data})
      
    })
  }


  render() {
    let wakeboardList = this.state.wakeboards.map(item => {
      return (
        <div className="product-child" key={item.id}>
          <Link to={`/products/${item.type}/${item.id}`} style={{ textDecoration: 'none' }}>
            <h5>{item.name}</h5>
            <img src={item.image_url} alt={item.title} className="product-img" />
            <h5>${item.price}</h5>
          </Link>
        </div>
      )
    })
    return (
      <div>
        <h1 className="product-title">WAKEBOARDS</h1>
        <div className="product-parent">
        {wakeboardList}
        </div>
      </div>
    )
  }
}
