import React, { Component } from 'react'
import productRoutes from '../../productRoutes';
import { Link } from 'react-router-dom';

import './Products.css'


export default class Products extends Component {
  render() {
    return (
      <div>
        
        <div className="subheader">
      
        <Link to='/products/wakeboards' className="link-text"><div className="wakeboard overlay link"></div>Wakeboard</Link>
        {' '}
        <Link to='/products/waterskis' className="link-text"><div className="waterski overlay link"></div>Waterskis</Link>
        {' '}
        <Link to='/products/tubes' className="link-text"><div className="tube overlay link"></div>Tubes</Link>
        {' '}
        <Link to='/products/lifevests' className="link-text"><div className="lifevest overlay link"></div>Life Vests</Link>
        </div>
        
        {productRoutes}

        
      </div>
    )
  }
}
