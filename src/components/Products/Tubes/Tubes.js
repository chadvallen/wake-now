import React, { Component } from 'react'
import axios from 'axios';
import '../Products.css';

export default class Tubes extends Component {
  constructor(){
    super();
    this.state = {
      tubes: []
    }
  }

  componentDidMount() {
    this.displayTubes()
  }

  displayTubes = () => {
    axios.get('/api/products/tubes').then(res => {
      this.setState({tubes: res.data})
    })
  }

  addToCart = (id, name, image_url, description, price) => {
    axios.post('/session/cart', {id, name, image_url, description, price}).then(() => {
      console.log('Item added to cart');
    })
  }

  render() {
    let tubesList = this.state.tubes.map(item => {
      return (
        <div className="product-child" key={item.id}>
          <h4>{item.name}</h4>
          <img src={item.image_url} alt="tube" />
          <p>{item.description}</p>
          <h5>${item.price}</h5>
          <button onClick={() => this.addToCart(item.id, item.name, item.image_url, item.description, item.price)}>Add to Cart</button>
        </div>
      )
    })
    return (
      <div>
        <h1>Tubes</h1>
        <div className="product-parent">
        {tubesList}
        </div>
      </div>
    )
  }
}
