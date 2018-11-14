import React, { Component } from 'react'
import productRoutes from '../../productRoutes';
import { Link } from 'react-router-dom';
import wakeboard from '../../media/wakeboarder.jpg';
import waterski from '../../media/waterskier.jpg';
import tube from '../../media/tubing.jpg';
import lifevest from '../../media/lifevest1.png';
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
      
        <Link to='/products/wakeboards'>
          <div className="container">
            <img src={wakeboard} className="image"/>
             <div className="overlay">
              <div className="text">Wakeboards</div>
            </div>
          </div>
        </Link>
        <Link to='/products/waterskis'>
          <div className="container">
            <img src={waterski} className="image"/>
             <div className="overlay">
              <div className="text">Waterskis</div>
            </div>
          </div>
        </Link>
        <Link to='/products/tubes'>
          <div className="container">
            <img src={tube} className="image"/>
             <div className="overlay">
              <div className="text">Tubes</div>
            </div>
          </div>
        </Link>
        <Link to='/products/lifevests'>
          <div className="container">
            <img src={lifevest} className="image"/>
             <div className="overlay">
              <div className="text">Life Vests</div>
            </div>
          </div>
        </Link>

        </div>
        
        {productRoutes}

       
        
      </div>
    )
  }
}



export default Products;