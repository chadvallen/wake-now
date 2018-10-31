import React, { Component } from 'react'
import productRoutes from '../../productRoutes';
import { Link } from 'react-router-dom';
import { Player } from 'video-react';
import './Products.css'


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
        <div>
          <Player className="video" src="https://player.vimeo.com/external/282919256.hd.mp4?s=53031fb6705a0982b2eaf1f808958b8c89f21eb8&profile_id=174" />
        </div>
        
      </div>
    )
  }
}
