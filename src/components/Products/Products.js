import React, { Component } from 'react'
import productRoutes from '../../productRoutes';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../ducks/reducer';
import axios from 'axios';
import './Products.css'


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

  addProduct = () => {
    let newProduct = {
      type: this.state.type,
      name: this.state.name,
      description: this.state.description,
      image_url: this.state.image_url,
      price: this.state.price
    }
    axios.post('/api/products', newProduct).then(() => {
      console.log('Product added')
    }).catch(error => {
      console.log('Error on addProduct FE', error)
    })
  }

  handleInputs = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  render() {
    const { user, loggedIn } = this.props;
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

        { 
          loggedIn && user.user.admin 
          ? <div className="inputs">
              <h3>Add Product</h3>
              <p>Type: </p><input name="type" onChange={event => this.handleInputs(event)}></input><br></br>
              <p>Name: </p><input name="name" onChange={event => this.handleInputs(event)}></input><br></br>
              <p>Description: </p><input name="description" onChange={event => this.handleInputs(event)}></input><br></br>
              <p>Price: </p><input name="price" onChange={event => this.handleInputs(event)}></input><br></br>
              <p>Image Url: </p><input name="image_url" onChange={event => this.handleInputs(event)}></input><br></br>
              <button onClick={() => this.addProduct()}>Add Product</button>
            </div>
          : console.log('Is not admin')
        }
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user, loggedIn } = state;
  return {
    user,
    loggedIn
  }
}

export default connect(mapStateToProps, {isLoggedIn})(Products);