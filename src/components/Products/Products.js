import React, { Component } from 'react'
import productRoutes from '../../productRoutes';
import { Link } from 'react-router-dom';


export default class Products extends Component {
  render() {
    return (
      <div>
        <h2>Products</h2>
        <Link to='/products/wakeboards'>Wakeboards</Link>
        {' '}
        <Link to='/products/waterskis'>Waterskis</Link>
        {' '}
        <Link to='/products/tubes'>Tubes</Link>
        {' '}
        <Link to='/products/lifevests'>Lifevests</Link>
        {productRoutes}
        
      </div>
    )
  }
}
