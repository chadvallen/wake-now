import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../../ducks/reducer';

class ProductDetail extends Component {
    constructor(){
        super();
        this.state = {
            product: []
        }
    }

    componentDidMount(){
        this.displayProductDetail();
    }

    displayProductDetail = () => {
        axios.get(`/api/products/${this.props.match.params.id}`).then(res => {
            this.setState({product: res.data})
        })
    }


    addToCart = (id, name, image_url, description, price) => {
        axios.post('/session/cart', {id, name, image_url, description, price}).then(() => {
        console.log('Item added to cart');
        })
    }

    deleteProduct = (id) => {
        axios.delete(`/api/products/${id}`).then(() => {
            console.log('Product deleted')
        }).catch(error => {
            console.error('Error on deleteProduct FE', error)
        })
    }

  render() {
      const { user, loggedIn } = this.props;
      let product = this.state.product.map(item => {
          return (
              <div key={item.id}>
                  <h4 className="product-title">{item.name}</h4>
                  <img src={item.image_url} alt="product" />
                  <p>{item.description}</p>
                  <p>${item.price}</p>
                  <button onClick={() => this.addToCart(item.id, item.name, item.image_url, item.description, item.price)}>Add to Cart</button>
                  <br></br>
                  <Link to={`/products/${item.type}s`} >Back</Link>
                  {
                      loggedIn && user.user.admin 
                      ? <div>
                          <button onClick={() => this.deleteProduct(item.id)}>Remove</button>
                      </div>
                      : console.log('Is not admin')
                  }
              </div>
          )
      })

    return (
      <div>
        {product}
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

export default connect(mapStateToProps, {isLoggedIn})(ProductDetail);