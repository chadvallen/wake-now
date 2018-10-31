import React, { Component } from 'react'
import axios from 'axios';
import '../Products.css'

export default class LifeVests extends Component {
  constructor(){
    super();
    this.state = {
      lifevests: []
    }
  }

  componentDidMount(){
    this.displayLifeVests()
  }

  displayLifeVests = () => {
    axios.get('/api/products/lifevests').then(res => {
      this.setState({lifevests: res.data})
    })
  }

  addToCart = (name, image_url, description, price) => {
    axios.post('/session/cart', {name, image_url, description, price}).then(() => {
      console.log('Item added to cart');
    })
  }

  render() {
    let lifevestList = this.state.lifevests.map(item => {
      return (
        <div className="product-child" key={item.id}>
          <h3>{item.name}</h3>
          <img src={item.image_url} alt="tube" />
          <p>{item.description}</p>
          <h5>${item.price}</h5>
          <button onClick={() => this.addToCart(item.name, item.image_url, item.description, item.price)}>Add to Cart</button>
        </div>
      )
    })
    return (
      <div>
        <h1>Life Vests</h1>
        <div className="product-parent">
        {lifevestList}
        </div>
      </div>
    )
  }
}
