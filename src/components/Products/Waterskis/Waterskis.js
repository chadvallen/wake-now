import React, { Component } from 'react';
import axios from 'axios';
import '../../../App';
import { Link } from 'react-router-dom';

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


  render() {
    let waterskiList = this.state.waterskis.map(item => {
      return (
        <div className="product-child" key={item.id}>
          <Link to={`/products/${item.type}/${item.id}`} style={{ textDecoration: 'none' }}>
            <h5>{item.name}</h5>
            <img src={item.image_url} alt={item.title} className="product-img"/>
            <h5>${item.price}</h5>
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
