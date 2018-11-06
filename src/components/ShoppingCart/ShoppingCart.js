import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { userLogin } from '../../ducks/reducer';
import  StripeCheckout from 'react-stripe-checkout';
import './ShoppingCart.css';

class ShoppingCart extends Component {
  constructor(){
    super();
    this.state = {
      cart: [],
      total: 0
    }
  }

  componentDidMount() {
    this.displayCart();
  }

  login = () => {
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    window.location = url;
    
  }

  displayCart = () => {
    axios.get('/session/cart').then(res => {
      console.log('res.data.cart --->', res.data.cart)
      let total = 0;
      if (res.data.cart !== undefined) {
        res.data.cart.map(item => {
          return total += item.price
        })
      } 
      this.setState({cart: res.data.cart, total: total})
    })
  }

  deleteFromCart = (id) => {
    axios.delete(`/session/cart/${id}`).then(() => {
      
    })
    this.displayCart();
  }

  onToken = (token) => {
    axios.post('/api/stripe', {
      method: 'POST',
      body: token,
      amount: this.state.total * 100
    }).then(response => {
      response.json().then(data => {
        console.log('data', data)
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render() {
    
    const {  loggedIn } = this.props
    return (
      <div>
        <h3>Cart</h3>
        { loggedIn
            ? this.state.cart.map(item => {
              return (
                <div className="product-child" key={item.id} >
                  <h3>{item.name}</h3>
                  <img src={item.image_url}  alt={item.name}/>
                  <h5>${item.price}</h5>
                  <button onClick={() => this.deleteFromCart(item.id)}>Delete</button>
                </div>
              )
              })
            : <p>Cart empty</p>
          }
          <p>Total {this.state.total}.00</p>
          <div>
          <StripeCheckout
             token={this.onToken}
             stripeKey="pk_test_Q2WPHWWxe9LqryczmA0WuuUx"
             amount= {this.state.total * 100}
             />
          </div>
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

export default connect(mapStateToProps, {userLogin})(ShoppingCart);