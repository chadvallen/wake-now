import React, { Component } from 'react';
import axios from 'axios';
import './Wakeboards.css';

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

  addToCart = (name, image_url, description, price) => {
    axios.post('/session/cart', {name, image_url, description, price}).then(() => {
      console.log('Item added to cart');
    })
  }

  render() {
    let wakeboardList = this.state.wakeboards.map(item => {
      return (
        <div className="product-child" key={item.id}>
          
          <h3>{item.name}</h3>
          <img src={item.image_url} alt="wakeboard" />
          <p>{item.description}</p>
          <h5>${item.price}</h5>
          <button onClick={() => this.addToCart(item.name, item.image_url, item.description, item.price)}>Add to Cart</button>
          
        </div>
      )
    })
    return (
      <div>
        <h1>Wakeboards</h1>
        <div className="product-parent">
        {wakeboardList}
        </div>
      </div>
    )
  }
}
