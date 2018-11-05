import React, { Component } from 'react'
import axios from 'axios';
import '../Products.css'
import { Link } from 'react-router-dom';

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

  render() {
    let lifevestList = this.state.lifevests.map(item => {
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
        <h1 className="product-title">Life Vests</h1>
        <div className="product-parent">
        {lifevestList}
        </div>
      </div>
    )
  }
}
