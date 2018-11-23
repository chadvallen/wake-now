import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { userLogin } from '../../ducks/reducer';
import  StripeCheckout from 'react-stripe-checkout';
import '../../App';

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
      console.log('Deleted from cart')
    })
    this.displayCart();
  }

  login = () => {
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    window.location = url;
  }

  onToken = (token) => {
    axios.post('/api/stripe', {
      method: 'POST',
      body: token,
      amount: this.state.total * 100
    }).then(response => {
      console.log('token--->',token)
        if (response.data.success) {
          axios.post('/api/orders', {
            name: token.card.name,
            shipping_address: token.card.address_line1,
            city: token.card.address_city,
            state_name: token.card.address_state,
            zipcode: token.card.address_zip,
            user_id: this.props.user.user.id
          }).then(response => {
            for (let i = 0; i < this.state.cart.length; i++) {
              axios.post('/api/line_items', {
                order_id: response.data[0].id,
                product_id: this.state.cart[i].id
              }).then(() => {
                console.log('Success!')
                if (i === this.state.cart.length - 1) {
                  console.log('It worked')
                  this.setState({total: 0})
                  this.displayCart();
                }
              }).catch(error => {
                console.log('error', error)
              })
          }}).catch(error => {
            console.log('Error on addToOrders', error)
          })
        }
        console.log(this.props)
        this.props.history.push('/confirmation')
    });
  }

  render() {
    const {  loggedIn } = this.props
    return (
      <div>
        <h1>Cart</h1>
        { loggedIn
            ? this.state.cart.map(item => {
              return (
                <div  key={item.id} >
                  <div className="detail-bg">
                  <img src={item.image_url}  alt={item.name} className="detail-img"/>
                  </div>
                  <h3>{item.name}</h3>
                  <h5>${item.price}</h5>
                  <button onClick={() => this.deleteFromCart(item.id)}>Delete</button>
                </div>
              )
              })
            : 
            <div className="empty-cart">
              <p>Cart empty</p>
              <button onClick={this.login}>Log in</button>
            </div>

          }
            <p className="total">Total ${this.state.total}.00</p>

            <div className="z1">
            <StripeCheckout
              token={this.onToken}
              stripeKey="pk_test_Q2WPHWWxe9LqryczmA0WuuUx"
              amount= {this.state.total * 100}
              shippingAddress
              billingAddress
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