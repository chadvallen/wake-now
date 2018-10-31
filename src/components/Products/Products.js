import React, { Component } from 'react'
import productRoutes from '../../productRoutes';
import { Link } from 'react-router-dom';

import './Products.css'


export default class Products extends Component {
  render() {
    return (
      <div>
        
        <div className="subheader">
        <Link to='/products/wakeboards'><button>Wakeboards</button></Link>
        {' '}
        <Link to='/products/waterskis'><button>Waterskis</button></Link>
        {' '}
        <Link to='/products/tubes'><button>Tubes</button></Link>
        {' '}
        <Link to='/products/lifevests'><button>Lifevests</button></Link>
        </div>
        
        {productRoutes}

        
      </div>
    )
  }
}
