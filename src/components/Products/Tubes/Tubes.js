import React, { Component } from 'react'
import axios from 'axios';
import '../Products.css';
import { Link } from 'react-router-dom';

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

  render() {
    let tubesList = this.state.tubes.map(item => {
      return (
        <div className="product-child" key={item.id}>
          <Link to={`/products/${item.type}/${item.id}`} style={{ textDecoration: 'none' }}>
            <h4>{item.name}</h4>
            <img src={item.image_url} alt={item.title} className="product-img" />
            <h5>${item.price}</h5>
          </Link>
        </div>
      )
    })
    return (
      <div>
        <h1 className="product-title">Tubes</h1>
        <div className="product-parent">
        {tubesList}
        </div>
      </div>
    )
  }
}
