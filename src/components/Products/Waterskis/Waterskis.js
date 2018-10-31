import React, { Component } from 'react';
import axios from 'axios';
import '../Products.css';

export default class Waterskis extends Component {
  constructor() {
    super();

    this.state = {
      waterskis: []
    }
  }

  componentDidMount() {
    this.displayWaterskis()
  }

  displayWaterskis = () => {
    axios.get('/api/products/waterskis').then(res => {
      this.setState({waterskis: res.data})
    })
  }

  addToCart = (name, image_url, description, price) => {
    axios.post('/session/cart', {name, image_url, description, price}).then(() => {
      console.log('Item added to cart');
    })
  }

  render() {
    let waterskiList = this.state.waterskis.map(item => {
      return (
        <div className="product-child" key={item.id}>
          <h3>{item.name}</h3>
          <img src={item.image_url} alt="waterski" />
          <p>{item.description}</p>
          <h5>${item.price}</h5>
          <button onClick={() => this.addToCart(item.name, item.image_url, item.description, item.price)}>Add to Cart</button>
        </div>
      )
    })
    return (
      <div>
        <h1>Waterskis</h1>
        <div className="product-parent">
        {waterskiList}
        </div>
      </div>
    )
  }
}
