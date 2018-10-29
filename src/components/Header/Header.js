import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <div>
        <h1>Header</h1>
        <nav>
          <button><Link to='/'>Home</Link></button>
          <button><Link to='/products'>Products</Link></button>
          <button><Link to='/cart'>Cart</Link></button>
        </nav>
      </div>
    )
  }
}
