import React, { Component } from 'react'
import productRoutes from '../../productRoutes';
import { Link } from 'react-router-dom';
import '../../App';


class Products extends Component {
  constructor() {
    super();
    this.state = {
      type: '',
      name: '',
      description: '',
      price: 0,
      image_url: ''
    }
  }


  render() {
    return (
      <div>
        
        <div className="subheader">
      
        <Link to='/products/wakeboards' className="link-text"><div className="wakeboard overlay link"></div>Wakeboards</Link>
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



export default Products;